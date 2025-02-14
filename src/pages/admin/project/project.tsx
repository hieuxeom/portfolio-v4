import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import useAxios from "../../../hooks/useAxios";
import API_ROUTE from "../../../configs/api.config";
import { TProjectGroup, TProjectResponse } from "../../../types/project";
import { IAPIResponse } from "../../../types/general";
import { useNavigate } from "react-router";
import TableWrapper from "../../../components/table/table-wrapper";
import TableHeader from "../../../components/table/table-header";
import TableCell from "../../../components/table/table-cell";
import TableBody from "../../../components/table/table-body";
import TableRow from "../../../components/table/table-row";
import Button from "../../../components/button";

import { formatDate } from "../../../utils/convert-datetime";
import toast from "react-hot-toast";

import TableCellAction from "../../../components/table/table-cell-action";
import useAxiosServer from "../../../hooks/useAxiosServer";
import Loading from "../../../components/loading";
import ModalWrapper from "../../../components/modal-wrapper";

import Input from "../../../components/input";
import Typography from "../../../components/typography";
import Chip from "../../../components/chip";

interface ProjectProps {}

const Project = (props: ProjectProps) => {
	const axios = useAxiosServer();
	const navigate = useNavigate();
	const [listProjects, setListProjects] = useState<TProjectResponse[]>([]);
	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const [newGroupTitle, setNewGroupTitle] = useState<string>("");

	const getListProjects = async () => {
		axios
			.get<IAPIResponse<TProjectResponse[]>>(API_ROUTE.PROJECT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListProjects(response.results);
			});
	};

	const getListProjectGroup = async () => {
		axios
			.get<IAPIResponse<TProjectGroup[]>>(API_ROUTE.PROJECT.GET_ALL_GROUP)
			.then((response) => response.data)
			.then((response) => {
				setListProjectGroups(response.results);
			});
	};

	const handleDeleteProject = (projectId: string | number) => {
		const promiseFn = axios
			.delete<IAPIResponse>(API_ROUTE.PROJECT.DELETE(projectId))
			.then((response) => response.data)
			.then((response) => {
				getListProjects();
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Delete successfully",
			error: (error) => "Error when fetching",
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

	const handleCreateNewProjectGroup = () => {
		const myFn = axios
			.post<IAPIResponse>(API_ROUTE.PROJECT.NEW_GROUP, {
				newGroupTitle,
			})
			.then((response) => response.data)
			.then((response) => {
				if (response.status === "success") {
					setIsShowModal(false);
					getListProjectGroup();
				}
			});

		toast.promise(myFn, {
			loading: "Creating...",
			success: "Successfully created new project group",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		const promiseFn = Promise.all([getListProjects(), getListProjectGroup()])
			// .then((response) => {})
			.finally(() => setIsFetching(false));
		toast.promise(promiseFn, {
			loading: "Loading...",
			success: "Fetch successfully",
			error: (error) => error.response.data.message,
		});
	}, []);
	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"relative px-8 py-8"}
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
				customElement={
					<Button
						startContent={ICON_CONFIG.NEW}
						size={"xl"}
						onClick={() => setIsShowModal(true)}
					>
						New Group
					</Button>
				}
			/>
			<div className={"w-full flex items-center gap-2"}>
				<Typography type={"large"}>Project Groups:</Typography>
				{listProjectGroups.map((_v) => (
					<Chip radius={"xl"}>{_v.group_title}</Chip>
				))}
			</div>
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

			<ModalWrapper
				isShowModal={isShowModal}
				setIsShowModal={setIsShowModal}
				title={"New Project Group"}
			>
				<Input
					label={"Project group title"}
					value={newGroupTitle}
					onChange={(e) => setNewGroupTitle(e.target.value)}
					name={"group_title"}
				/>
				<div className={"flex justify-end"}>
					<Button
						startContent={ICON_CONFIG.NEW}
						size={"lg"}
						color={"primary"}
						onClick={handleCreateNewProjectGroup}
					>
						Create
					</Button>
				</div>
			</ModalWrapper>
		</Wrapper>
	);
};

export default Project;
