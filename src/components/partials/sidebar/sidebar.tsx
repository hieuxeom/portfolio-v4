import { useState, useEffect } from "react";
import API_ROUTE from "../../../configs/api.config";
import useAxios from "../../../hooks/useAxios";
import { IAPIResponse } from "../../../types/general";
import { TProjectResponse, TProjectGroup } from "../../../types/project";
import SidebarGroup from "./sidebar-group";
import ROUTE_PATH from "../../../configs/routes.config";
import Button from "../../button";
import ICON_CONFIG from "../../../configs/icon.config";
import clsx from "clsx";
import useScroll from "../../../hooks/useScroll";
import Loading from "../../loading";
import useScreenSize from "../../../../../live-score-v2/src/hooks/useScreenSize";
import { BREAK_POINT } from "../../../../../live-score-v2/src/configs/break-points.config";

// interface SidebarProps {}

const Sidebar = () => {
	const axios = useAxios();

	const { width } = useScreenSize();

	const [listProjects, setListProjects] = useState<TProjectResponse[]>([]);
	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);
	const [isOpenMiniHeader, setIsOpenMiniHeader] = useState<boolean>(false);

	const [isFetching, setIsFetching] = useState<boolean>(true);

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

	const { scrollPosition } = useScroll();

	useEffect(() => {
		Promise.all([getListProject(), getListProjectGroup()]).finally(() => setIsFetching(false));
	}, []);

	useEffect(() => {
		console.log(listProjectGroups);
	}, [listProjectGroups]);

	return (
		<div className={"lg:w-max lg:relative absolute w-full z-10"}>
			<div className={"mobile-up lg:hidden fixed top-16 px-2 w-full"}>
				<div
					className={clsx("w-full p-2 rounded-b-2xl transition-all duration-300 ease-in-out", {
						"bg-dark/20 border border-dark/10": scrollPosition.top < 20,
						"bg-light border border-dark/10": scrollPosition.top >= 20,
					})}
				>
					<Button
						size={"md"}
						radius={"md"}
						isIconOnly
						className={"lg:hidden"}
						onClick={() => setIsOpenMiniHeader(!isOpenMiniHeader)}
					>
						{ICON_CONFIG.MENU}
					</Button>
				</div>
				<div
					className={clsx(
						"absolute top-0 right-0 h-screen w-3/4 bg-white p-4 shadow-lg border border-dark/10 z-100",
						{
							hidden: !isOpenMiniHeader,
							block: isOpenMiniHeader,
						}
					)}
				>
					{listProjectGroups
						.filter((item) => listProjects.filter((v) => v.group_id === item.group_id).length > 0)
						.map((group) => (
							<SidebarGroup
								onItemClick={() => setIsOpenMiniHeader(false)}
								title={group.group_title}
								isCloseDefault={
									listProjects.filter((item) => item.group_id === group.group_id).length <= 0
								}
								groupItems={listProjects
									.filter((item) => item.group_id === group.group_id)
									.map((_v) => ({
										title: _v.project_shortname,
										href: ROUTE_PATH.CLIENT.PROJECT.DETAILS(_v.id),
									}))}
							/>
						))}
				</div>
			</div>
			<div
				className={clsx(
					"tablet-up hidden py-8 sticky top-44 h-screen border-r border-r-dark/10",
					"2xl:pr-8",
					"xl:w-1/4",
					"lg:min-w-56 lg:flex lg:flex-col lg:gap-8 lg:pr-4"
				)}
			>
				{isFetching ? (
					<SidebarGroup
						title={"Loading..."}
						isCloseDefault={false}
						groupItems={[]}
					/>
				) : (
					listProjectGroups
						.filter((item) => listProjects.filter((v) => v.group_id === item.group_id).length > 0)
						.map((group, index) => (
							<SidebarGroup
								key={index}
								title={group.group_title}
								isCloseDefault={
									listProjects.filter((item) => item.group_id === group.group_id).length <= 0
								}
								groupItems={listProjects
									.filter((item) => item.group_id === group.group_id)
									.map((_v) => ({
										title: _v.project_shortname,
										href: ROUTE_PATH.CLIENT.PROJECT.DETAILS(_v.id),
									}))}
							/>
						))
				)}
			</div>
		</div>
	);
};

export default Sidebar;
