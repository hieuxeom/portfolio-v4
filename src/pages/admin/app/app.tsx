import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import Button from "../../../components/button";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import { TApp } from "../../../types/app";
import NewAppModal from "./new-app-modal";
import useAxiosServer from "../../../hooks/useAxiosServer";
import { IAPIResponse } from "../../../types/general";
import API_ROUTE from "../../../configs/api.config";
import toast from "react-hot-toast";
import TableWrapper from "../../../components/table/table-wrapper";

import TableHeader from "../../../components/table/table-header";
import TableCell from "../../../components/table/table-cell";
import TableBody from "../../../components/table/table-body";
import Loading from "../../../components/loading";
import TableRow from "../../../components/table/table-row";
import { formatDate } from "../../../utils/convert-datetime";
import UpdateAppModal from "./update-app-modal";
import Switch from "../../../components/switch";

interface AppProps {}

const App = (props: AppProps) => {
	const [isShowNewModal, setIsShowNewModal] = useState<boolean>(false);
	const [isShowUpdateModal, setIsShowUpdateModal] = useState<boolean>(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
	const [isShowDisplayStatusModal, setIsShowDisplayStatusModal] = useState<boolean>(false);

	const listColumns = [
		{
			key: "app_id",
			title: "App ID",
		},
		{
			key: "app_icon",
			title: "Icon",
		},
		{
			key: "app_name",
			title: "App Name",
		},
		{
			key: "app_link",
			title: "App Link",
		},
		{
			key: "created_at",
			title: "Created At",
		},
		{
			key: "display_status",
			title: "Display Status",
		},
		{
			key: "action",
			title: "Action",
		},
	];
	const [listApps, setListApps] = useState<TApp[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const [currentSelectedApp, setCurrentSelectedApp] = useState<TApp | null>(null);

	const axios = useAxiosServer();

	const getListApps = () => {
		const myFn = axios
			.get<IAPIResponse<TApp[]>>(API_ROUTE.APP.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListApps(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(myFn, {
			loading: "Fetching apps...",
			success: "Apps fetched successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleDeleteApp = (appId: string | number) => {
		const myFn = axios
			.delete<IAPIResponse>(API_ROUTE.APP.DELETE(appId))
			.then((response) => response.data)
			.then((response) => {
				getListApps();
			});

		toast.promise(myFn, {
			loading: "Deleting app...",
			success: "App deleted successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleUpdateStatus = (value: boolean, appId: string | number) => {
		// console.log(value, appId);

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.APP.UPDATE_DISPLAY(appId), {
				new_status: value ? "0" : "1",
			})
			.then((response) => response.data)
			.then((response) => {
				setListApps((prev) =>
					prev.map((app) => {
						if (app.app_id === appId) {
							return {
								...app,
								is_hide: value ? 0 : 1,
							};
						} else {
							return app;
						}
					})
				);
			});

		toast.promise(myFn, {
			loading: "Updating...",
			success: "Updated app display status successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListApps();
	}, []);

	useEffect(() => {
		if (!isShowNewModal) {
			getListApps();
		}
	}, [isShowNewModal, isShowUpdateModal]);
	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"relative px-8 py-8 min-h-screen"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Apps"}
				customElement={
					<Button
						startContent={ICON_CONFIG.NEW}
						size={"xl"}
						onClick={() => setIsShowNewModal(true)}
					>
						Add new app
					</Button>
				}
			/>

			<TableWrapper>
				<TableHeader>
					{listColumns.map((col) => (
						<TableCell
							isHeader
							key={col.key}
						>
							{col.title}
						</TableCell>
					))}
				</TableHeader>
				<TableBody>
					{isFetching ? (
						<TableRow isEmpty>
							<Loading size={"xl"} />
						</TableRow>
					) : listApps.length > 0 ? (
						listApps.map((app) => (
							<TableRow key={app.app_id}>
								<TableCell>{app.app_id}</TableCell>
								<TableCell>
									<div className={"flex items-center justify-center"}>
										<img
											src={app.app_icon}
											width={50}
											height={50}
											alt=""
										/>
									</div>
								</TableCell>
								<TableCell>{app.app_name}</TableCell>
								<TableCell>{app.app_link}</TableCell>
								<TableCell>{formatDate(app.created_at, "onlyDate")}</TableCell>
								<TableCell>
									<Switch
										label={app.is_hide === 0 ? "Show" : "Hide"}
										name={"is_hide"}
										size={"md"}
										isChecked={app.is_hide === 0}
										onChecked={(e) => handleUpdateStatus(e, app.app_id)}
									/>
								</TableCell>
								<TableCell>
									<div className={"flex justify-center items-center gap-1"}>
										<Button
											size={"lg"}
											color={"warning"}
											isIconOnly
											onClick={() => {
												setCurrentSelectedApp(app);
												setIsShowUpdateModal(true);
											}}
										>
											{ICON_CONFIG.EDIT}
										</Button>
										<Button
											size={"lg"}
											color={"danger"}
											isIconOnly
											onClick={() => {
												handleDeleteApp(app.app_id);
											}}
										>
											{ICON_CONFIG.PERMANENT_DELETE}
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow isEmpty>No data</TableRow>
					)}
				</TableBody>
			</TableWrapper>

			<NewAppModal
				isShowModal={isShowNewModal}
				setIsShowModal={setIsShowNewModal}
			/>
			{currentSelectedApp && (
				<UpdateAppModal
					currentAppDetails={currentSelectedApp}
					isShowModal={isShowUpdateModal}
					setIsShowModal={setIsShowUpdateModal}
				/>
			)}
		</Wrapper>
	);
};

export default App;
