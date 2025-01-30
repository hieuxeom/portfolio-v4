import { useState, useEffect } from "react";
import API_ROUTE from "../../../configs/api.config";
import useAxios from "../../../hooks/useAxios";
import { IAPIResponse } from "../../../types/general";
import { TProjectResponse, TProjectGroup } from "../../../types/project";
import Typography from "../../typography";
import SidebarGroup from "./sidebar-group";
import ROUTE_PATH from "../../../configs/routes.config";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
	const axios = useAxios();

	const [listProjects, setListProjects] = useState<TProjectResponse[]>([]);
	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);

	const getListProject = () => {
		axios
			.get<IAPIResponse<TProjectResponse[]>>(API_ROUTE.PROJECT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListProjects(response.results);
			});
	};

	const getListProjectGroup = () => {
		axios
			.get<IAPIResponse<TProjectGroup[]>>(API_ROUTE.PROJECT.GET_ALL_GROUP)
			.then((response) => response.data)
			.then((response) => {
				setListProjectGroups(response.results);
			});
	};

	useEffect(() => {
		Promise.all([getListProject(), getListProjectGroup()]).finally(() => {});
	}, []);

	useEffect(() => {
		console.log(listProjectGroups);
	}, [listProjectGroups]);

	return (
		<div className={"w-1/4 py-8 pr-8 sticky top-44 h-screen border-r border-r-dark/10 flex flex-col gap-8"}>
			{listProjectGroups
				.filter((item) => listProjects.filter((v) => v.group_id === item.group_id).length > 0)
				.map((group) => (
					<SidebarGroup
						title={group.group_title}
						isCloseDefault={listProjects.filter((item) => item.group_id === group.group_id).length <= 0}
						groupItems={listProjects
							.filter((item) => item.group_id === group.group_id)
							.map((_v) => ({
								title: _v.project_shortname,
								href: ROUTE_PATH.CLIENT.PROJECT.DETAILS(_v.id),
							}))}
					/>
				))}
		</div>
	);
};

Sidebar.defaultProps = {};

export default Sidebar;
