import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import TableBody from "../../../components/table/table-body";
import TableCell from "../../../components/table/table-cell";
import TableHeader from "../../../components/table/table-header";
import TableWrapper from "../../../components/table/table-wrapper";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { TEmployment } from "../../../types/employment";
import TableRow from "../../../components/table/table-row";
import Loading from "../../../components/loading";
import { formatDate } from "../../../utils/convert-datetime";
import TableCellAction from "../../../components/table/table-cell-action";
import API_ROUTE from "../../../configs/api.config";
import { IAPIResponse } from "../../../types/general";
import toast from "react-hot-toast";
import useAxiosServer from "../../../hooks/useAxiosServer";

interface EmploymentProps {}

const Employment = (props: EmploymentProps) => {
	const listColumns = [
		{
			key: "id",
			title: "ID",
		},
		{
			key: "title",
			title: "Title",
		},
		{
			key: "organization",
			title: "Organization",
		},
		{
			key: "workTime",
			title: "Work Time",
		},
		{
			key: "action",
			title: "Action",
		},
	];

	const axios = useAxiosServer();
	const navigate = useNavigate();

	const [isFetching, setIsFetching] = useState(true);
	const [listEmploymentHistory, setListEmploymentHistory] = useState<TEmployment[]>([]);

	const getListEmploymentHistory = () => {
		const myFn = axios
			.get<IAPIResponse<TEmployment[]>>(API_ROUTE.EMPLOYMENT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListEmploymentHistory(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(myFn, {
			loading: "Fetching...",
			success: "Successfully fetched list employment history",
			error: (error) => error.response.data.message,
		});
	};

	const handleSoftDelete = (employmentId: string | number) => {
		const promiseFn = axios
			.patch<IAPIResponse>(API_ROUTE.EMPLOYMENT.SOFT_DELETE(employmentId))
			.then((response) => response.data)
			.then((response) => {
				setListEmploymentHistory((prev) =>
					prev.map((employment) => {
						if (employment.id === employmentId) {
							employment.is_deleted = 1;
						}
						return employment;
					})
				);
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Delete successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleRecover = (employmentId: string | number) => {
		const promiseFn = axios
			.patch<IAPIResponse>(API_ROUTE.EMPLOYMENT.RECOVER(employmentId))
			.then((response) => response.data)
			.then((response) => {
				setListEmploymentHistory((prev) =>
					prev.map((employment) => {
						if (employment.id === employmentId) {
							employment.is_deleted = 0;
						}
						return employment;
					})
				);
			});

		toast.promise(promiseFn, {
			loading: "Recovering...",
			success: "Recover successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handlePermanentDelete = (employmentId: string | number) => {
		const promiseFn = axios
			.delete<IAPIResponse>(API_ROUTE.EMPLOYMENT.PERMANENT_DELETE(employmentId))
			.then((response) => response.data)
			.then((response) => {
				setListEmploymentHistory((prev) => prev.filter((employment) => employment.id !== employmentId));
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Permanent delete successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListEmploymentHistory();
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Employment History"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.NEW,
					text: "Add new",
					href: ROUTE_PATH.ADMIN.EMPLOYMENT.NEW,
				}}
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
					) : listEmploymentHistory.length > 0 ? (
						listEmploymentHistory.map((employment) => (
							<TableRow>
								<TableCell>{employment.id}</TableCell>
								<TableCell>{employment.title}</TableCell>
								<TableCell>{employment.organization}</TableCell>
								<TableCell>
									{formatDate(employment.time_start, "onlyDate")} -{" "}
									{formatDate(employment.time_end, "onlyDate")}
								</TableCell>
								<TableCell>
									<TableCellAction
										mode={employment.is_deleted === 1}
										onEdit={() => navigate(ROUTE_PATH.ADMIN.EMPLOYMENT.DETAILS(employment.id))}
										onSoftDelete={() => handleSoftDelete(employment.id)}
										onRecover={() => handleRecover(employment.id)}
										onPermanentDelete={() => handlePermanentDelete(employment.id)}
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow isEmpty>No employment history have been added yet</TableRow>
					)}
				</TableBody>
			</TableWrapper>
		</Wrapper>
	);
};

Employment.defaultProps = {};

export default Employment;
