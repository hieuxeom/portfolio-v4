import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import useAxios from "../../../hooks/useAxios";
import API_ROUTE from "../../../configs/api.config";
import Typography from "../../../components/typography";
import { TProject } from "../../../types/project";
import { IAPIResponse } from "../../../types/general";
import clsx from "clsx";
import Table from "../../../components/table/table";
import { useNavigate } from "react-router";

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
			<Table
				columns={listColumns}
				data={listProjects}
				haveActionColumns={true}
				actionConfig={{
					onEditAction: (value: string | number) => {
						navigate(ROUTE_PATH.ADMIN.PROJECT.EDIT(value));
					},
					onDeleteAction: handleDeleteProject,
					onClickRow: (value: string | number) => {
						window.open(ROUTE_PATH.CLIENT.PROJECT.DETAILS(value));
					},
				}}
			/>
		</Wrapper>
	);
};
Project.defaultProps = {};

export default Project;
