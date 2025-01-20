import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import useAxios from "../../../hooks/useAxios";
import API_ROUTE from "../../../configs/api.config";
import { TProject } from "../../../types/project";
import { IAPIResponse } from "../../../types/general";
import { useNavigate } from "react-router";
import TableWrapper from "../../../components/table/table-wrapper";
import TableHeader from "../../../components/table/table-header";
import TableCell from "../../../components/table/table-cell";
import TableBody from "../../../components/table/table-body";
import TableRow from "../../../components/table/table-row";
import Button from "../../../components/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { formatDate } from "../../../utils/convert-datetime";

interface ProjectProps {}

const Project = (props: ProjectProps) => {
	const axios = useAxios();
	const navigate = useNavigate();
	const [listProjects, setListProjects] = useState<TProject[]>([]);

	const getListProjects = async () => {
		axios
			.get<IAPIResponse<TProject[]>>(API_ROUTE.PROJECT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListProjects(response.results);
			});
	};

	const handleDeleteProject = (projectId: string | number) => {
		axios
			.delete<IAPIResponse>(API_ROUTE.PROJECT.DELETE(projectId))
			.then((response) => response.data)
			.then((response) => {
				getListProjects();
			});
	};

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
			key: "created_at",
			title: "Created At",
		},
		{
			key: "action",
			title: "Action",
		},
	];

	useEffect(() => {
		getListProjects();
	}, []);
	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Projects"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.NEW,
					text: "Add new",
					href: ROUTE_PATH.ADMIN.PROJECT.NEW,
				}}
			/>
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
					{listProjects.map((project) => (
						<TableRow onClick={() => window.open(ROUTE_PATH.CLIENT.PROJECT.DETAILS(project.id))}>
							<TableCell>{project.id}</TableCell>
							<TableCell>{project.project_shortname}</TableCell>
							<TableCell>{formatDate(project.created_at)}</TableCell>
							<TableCell>
								<div className={"flex justify-center items-center gap-1"}>
									<Button
										size={"lg"}
										color={"warning"}
										isIconOnly
										onClick={() => navigate(ROUTE_PATH.ADMIN.PROJECT.EDIT(project.id))}
									>
										<MdEdit />
									</Button>

									<Button
										size={"lg"}
										color={"danger"}
										isIconOnly
										onClick={() => handleDeleteProject(project.id)}
									>
										<MdDelete />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableWrapper>
		</Wrapper>
	);
};
Project.defaultProps = {};

export default Project;
