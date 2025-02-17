import { useEffect, useState } from "react";
import Input from "../../../../../components/input";
import Loading from "../../../../../components/loading";
import TableBody from "../../../../../components/table/table-body";
import TableCell from "../../../../../components/table/table-cell";
import TableCellAction from "../../../../../components/table/table-cell-action";
import TableHeader from "../../../../../components/table/table-header";
import TableRow from "../../../../../components/table/table-row";
import TableWrapper from "../../../../../components/table/table-wrapper";
import useAxiosServer from "../../../../../hooks/useAxiosServer";
import { TProjectGroup } from "../../../../../types/project";
import ICON_CONFIG from "../../../../../configs/icon.config";
import Button from "../../../../../components/button";
import { IAPIResponse } from "../../../../../types/general";
import API_ROUTE from "../../../../../configs/api.config";
import toast from "react-hot-toast";
import ModalWrapper from "../../../../../components/modal-wrapper";

interface ProjectGroupsSideProps {
	triggerUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectGroupsSide = ({ triggerUpdate }: ProjectGroupsSideProps) => {
	const listColumns = [
		{
			key: "title",
			title: "Group Title",
		},
		{
			key: "action",
			title: "Action",
		},
	];

	const axios = useAxiosServer();

	const [currentEditing, setCurrentEditing] = useState<null | string | number>(null);
	const [newGroupTitle, setNewGroupTitle] = useState<string>("");

	const [listProjectGroups, setListProjectGroups] = useState<TProjectGroup[]>([]);

	const [isFetching, setIsFetching] = useState<boolean>(true);

	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const getListProjectGroup = async () => {
		axios
			.get<IAPIResponse<TProjectGroup[]>>(API_ROUTE.PROJECT.GET_ALL_GROUP)
			.then((response) => response.data)
			.then((response) => {
				setListProjectGroups(response.results);
			})
			.finally(() => setIsFetching(false));
	};

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

	const handleUpdateGroupTitle = () => {
		if (!currentEditing) return;

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.PROJECT.UPDATE_GROUP(currentEditing), {
				newGroupTitle,
			})
			.then((response) => response.data)
			.then(() => {
				setCurrentEditing(null);
				setNewGroupTitle("");
				triggerUpdate(true);
				getListProjectGroup();
			});

		toast.promise(myFn, {
			loading: "Updating...",
			success: "Updated group title successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleSoftDeleteGroup = (groupId: string | number) => {
		if (!groupId) return;

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.PROJECT.SOFT_DELETE_GROUP(groupId))
			.then((response) => response.data)
			.then(() => {
				getListProjectGroup();
			});

		toast.promise(myFn, {
			loading: "Deleting...",
			success: "Deleted group successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleRecoverGroup = (groupId: string | number) => {
		if (!groupId) return;

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.PROJECT.RECOVER_GROUP(groupId))
			.then((response) => response.data)
			.then(() => {
				getListProjectGroup();
			});

		toast.promise(myFn, {
			loading: "Recovering...",
			success: "Recover group successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleDeleteGroup = (groupId: string | number) => {
		if (!groupId) return;

		const myFn = axios
			.delete<IAPIResponse>(API_ROUTE.PROJECT.DELETE_GROUP(groupId))
			.then((response) => response.data)
			.then(() => {
				getListProjectGroup();
			});

		toast.promise(myFn, {
			loading: "Recovering...",
			success: "Recover group successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListProjectGroup();
	}, []);

	return (
		<div className={"flex flex-col gap-4"}>
			<Button
				startContent={ICON_CONFIG.NEW}
				size={"xl"}
				onClick={() => setIsShowModal(true)}
				className={"w-max"}
			>
				New Group
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
					) : listProjectGroups.length > 0 ? (
						listProjectGroups.map((group) => (
							<TableRow>
								<TableCell className={"!text-left"}>
									{currentEditing === group.group_id ? (
										<Input
											value={newGroupTitle}
											name={"newGroupTitle"}
											onChange={(e) => setNewGroupTitle(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													handleUpdateGroupTitle();
												}
											}}
										/>
									) : (
										group.group_title
									)}
								</TableCell>

								<TableCell>
									{currentEditing === group.group_id ? (
										<Button
											isIconOnly
											size={"lg"}
											color={"success"}
											onClick={() => {
												handleUpdateGroupTitle();
											}}
										>
											{ICON_CONFIG.SAVE}
										</Button>
									) : (
										<TableCellAction
											mode={group.is_deleted === 1}
											// showViewButton
											onEdit={() => {
												setCurrentEditing(group.group_id);
												setNewGroupTitle(group.group_title);
											}}
											onSoftDelete={() => handleSoftDeleteGroup(group.group_id)}
											onRecover={() => handleRecoverGroup(group.group_id)}
											onPermanentDelete={() => handleDeleteGroup(group.group_id)}
										/>
									)}
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
		</div>
	);
};

export default ProjectGroupsSide;
