import { useNavigate } from "react-router";
import Loading from "../../../../../components/loading";
import TableBody from "../../../../../components/table/table-body";
import TableCell from "../../../../../components/table/table-cell";
import TableCellAction from "../../../../../components/table/table-cell-action";
import TableHeader from "../../../../../components/table/table-header";
import TableRow from "../../../../../components/table/table-row";
import TableWrapper from "../../../../../components/table/table-wrapper";
import ROUTE_PATH from "../../../../../configs/routes.config";
import { TProjectResponse } from "../../../../../types/project";
import { formatDate } from "../../../../../utils/convert-datetime";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API_ROUTE from "../../../../../configs/api.config";
import useAxiosServer from "../../../../../hooks/useAxiosServer";
import { IAPIResponse } from "../../../../../types/general";
import Button from "../../../../../components/button";
import ICON_CONFIG from "../../../../../configs/icon.config";

interface ListProjectsSideProps {
	updateStatus: boolean;
	triggerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListProjectsSide = ({ updateStatus, triggerUpdate }: ListProjectsSideProps) => {
	const listColumns = [
		{
			key: "id",
			title: "Project ID",
		},
		{
			key: "project_shortname",
			title: "Project Name",
		},
		{
			key: "group",
			title: "Group",
		},
		{
			key: "created_at",
			title: "Created At",
		},
		{
			key: "action",
			title: "Action",
		},
	];

	const navigate = useNavigate();

	const axios = useAxiosServer();

	const [listProjects, setListProjects] = useState<TProjectResponse[]>([]);

	const [isFetching, setIsFetching] = useState<boolean>(true);

	const getListProjects = () => {
		const promiseFn = axios
			.get<IAPIResponse<TProjectResponse[]>>(API_ROUTE.PROJECT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListProjects(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(promiseFn, {
			loading: "Loading...",
			success: "Fetch successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleDeleteProject = (projectId: string | number) => {
		const promiseFn = axios
			.delete<IAPIResponse>(API_ROUTE.PROJECT.DELETE_PROJECT(projectId))
			.then((response) => response.data)
			.then(() => {
				getListProjects();
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Delete successfully",
			error: "Error when fetching",
		});
	};

	useEffect(() => {
		getListProjects();
	}, []);

	useEffect(() => {
		if (updateStatus) {
			getListProjects();
			triggerUpdate(false);
		}
	}, [updateStatus]);

	return (
		<div className={"flex flex-col gap-4"}>
			<Button
				className={"w-max self-end"}
				size={"xl"}
				startContent={ICON_CONFIG.NEW}
				onClick={() => navigate(ROUTE_PATH.ADMIN.PROJECT.NEW)}
			>
				Add new Project
			</Button>
			<TableWrapper>
				<TableHeader>
					{listColumns.map((column) => (
						<TableCell
							isHeader
							key={column.key}
						>
							{column.title}
						</TableCell>
					))}
				</TableHeader>
				<TableBody>
					{isFetching ? (
						<TableRow isEmpty>
							<Loading size={"xl"} />
						</TableRow>
					) : listProjects.length > 0 ? (
						listProjects.map((project) => (
							<TableRow>
								<TableCell>{project.id}</TableCell>
								<TableCell>{project.project_shortname}</TableCell>
								<TableCell>{project.group_title}</TableCell>
								<TableCell>{formatDate(project.created_at)}</TableCell>
								<TableCell>
									<TableCellAction
										mode={project.is_deleted === 1}
										showViewButton
										onEdit={() => navigate(ROUTE_PATH.ADMIN.PROJECT.EDIT(project.id))}
										onSoftDelete={() => handleDeleteProject(project.id)}
										onViewDetails={() => window.open(ROUTE_PATH.CLIENT.PROJECT.DETAILS(project.id))}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow isEmpty>No projects have been added yet</TableRow>
					)}
				</TableBody>
			</TableWrapper>
		</div>
	);
};

export default ListProjectsSide;
