import { FaAngleLeft, FaArrowRotateLeft, FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../components/admin/admin-header";
import Input from "../../../components/input";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import { TEducation } from "../../../types/education";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import API_ROUTE from "../../../configs/api.config";
import { IAPIResponse } from "../../../types/general";
import Table from "../../../components/table/table";
import TableWrapper from "../../../components/table/table-wrapper";
import TableHeader from "../../../components/table/table-header";
import TableCell from "../../../components/table/table-cell";
import TableBody from "../../../components/table/table-body";
import TableRow from "../../../components/table/table-row";
import { formatDate } from "../../../utils/convert-datetime";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from "../../../components/button";
import toast from "react-hot-toast";
import Loading from "../../../components/loading";
import TableCellAction from "../../../components/table/table-cell-action";
import useAxiosServer from "../../../hooks/useAxiosServer";

interface EducationProps {}

const Education = (props: EducationProps) => {
	// const axios = useAxios();
	const axios = useAxiosServer();
	const navigate = useNavigate();

	const [listEducation, setListEducation] = useState<TEducation[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	const listColumns = [
		{
			key: "id",
			title: "Edu ID",
		},
		{
			key: "title",
			title: "Major",
		},
		{
			key: "organization",
			title: "Organization",
		},
		{
			key: "time_start",
			title: "Time Start",
		},
		{
			key: "time_end",
			title: "Time End",
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

	const getListEducation = () => {
		const promiseFn = axios
			.get<IAPIResponse<TEducation[]>>(API_ROUTE.EDUCATION.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListEducation(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(promiseFn, {
			loading: "Loading",
			success: "Fetch successfully",
			error: "Error when fetching",
		});
	};

	const handleSoftDelete = (educationId: string | number) => {
		const promiseFn = axios
			.patch<IAPIResponse>(API_ROUTE.EDUCATION.SOFT_DELETE(educationId))
			.then((response) => response.data)
			.then((response) => {
				setListEducation((prev) =>
					prev.map((education) => {
						if (education.id === educationId) {
							education.is_deleted = 1;
						}
						return education;
					})
				);
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Delete successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleRecover = (educationId: string | number) => {
		const promiseFn = axios
			.patch<IAPIResponse>(API_ROUTE.EDUCATION.RECOVER(educationId))
			.then((response) => response.data)
			.then((response) => {
				setListEducation((prev) =>
					prev.map((education) => {
						if (education.id === educationId) {
							education.is_deleted = 0;
						}
						return education;
					})
				);
			});

		toast.promise(promiseFn, {
			loading: "Recovering...",
			success: "Recover successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handlePermanentDelete = (educationId: string | number) => {
		const promiseFn = axios
			.delete<IAPIResponse>(API_ROUTE.EDUCATION.PERMANENT_DELETE(educationId))
			.then((response) => response.data)
			.then((response) => {
				setListEducation((prev) => prev.filter((education) => education.id !== educationId));
			});

		toast.promise(promiseFn, {
			loading: "Deleting...",
			success: "Permanent delete successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListEducation();
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
		>
			<AdminHeader
				title={"Education"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.NEW,
					text: "Add new",
					href: ROUTE_PATH.ADMIN.EDUCATION.NEW,
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
					{isFetching ? (
						<TableRow isEmpty>
							<Loading size={"xl"} />
						</TableRow>
					) : (
						listEducation.map((education) => (
							<TableRow>
								<TableCell>{education.id}</TableCell>
								<TableCell>{education.title}</TableCell>
								<TableCell>{education.organization}</TableCell>
								<TableCell>{formatDate(education.time_start, "onlyDate")}</TableCell>
								<TableCell>{formatDate(education.time_end, "onlyDate")}</TableCell>
								<TableCell>{formatDate(education.created_at)}</TableCell>
								<TableCell>
									<TableCellAction
										mode={education.is_deleted === 1}
										onEdit={() => navigate(ROUTE_PATH.ADMIN.EDUCATION.UPDATE(education.id))}
										onSoftDelete={() => handleSoftDelete(education.id)}
										onPermanentDelete={() => handlePermanentDelete(education.id)}
										onRecover={() => handleRecover(education.id)}
									/>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</TableWrapper>
		</Wrapper>
	);
};

Education.defaultProps = {};

export default Education;
