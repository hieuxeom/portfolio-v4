import { FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";
import TableWrapper from "../../../components/table/table-wrapper";
import TableHeader from "../../../components/table/table-header";
import TableCell from "../../../components/table/table-cell";
import TableBody from "../../../components/table/table-body";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import { TCertification } from "../../../types/certification";
import { useEffect, useState } from "react";
import { IAPIResponse } from "../../../types/general";
import API_ROUTE from "../../../configs/api.config";
import toast from "react-hot-toast";
import TableRow from "../../../components/table/table-row";
import Loading from "../../../components/loading";
import { formatDate } from "../../../utils/convert-datetime";
import TableCellAction from "../../../components/table/table-cell-action";

interface CertificationProps {}

const Certification = (props: CertificationProps) => {
	const axios = useAxios();
	const navigate = useNavigate();

	const columns = [
		{
			key: "id",
			title: "Cert ID",
		},
		{
			key: "title",
			title: "Title",
		},
		{
			key: "issued_by",
			title: "Issued By",
		},
		{
			key: "issued_date",
			title: "Issued Date",
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

	const [listCert, setListCert] = useState<TCertification[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	const getListCert = () => {
		const myFn = axios
			.get<IAPIResponse>(API_ROUTE.CERTIFICATION.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListCert(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(myFn, {
			loading: "Fetching...",
			success: "Successfully fetched list certification!",
			error: (error) => error.response.data.message,
		});
	};

	const handleSoftDelete = (certId: string | number) => {
		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.CERTIFICATION.SOFT_DELETE(certId))
			.then((response) => response.data)
			.then((response) => {
				setListCert((prev) =>
					prev.map((cert) => {
						if (cert.id === certId) {
							cert.is_deleted = 1;
						}
						return cert;
					})
				);
			});

		toast.promise(myFn, {
			loading: "Deleting...",
			success: "Deleted successfully!",
			error: (error) => error.response.data.message,
		});
	};

	const handleRecover = (certId: string | number) => {
		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.CERTIFICATION.RECOVER(certId))
			.then((response) => response.data)
			.then((response) => {
				setListCert((prev) =>
					prev.map((cert) => {
						if (cert.id === certId) {
							cert.is_deleted = 0;
						}
						return cert;
					})
				);
			});

		toast.promise(myFn, {
			loading: "Recovering...",
			success: "Recover successfully!",
			error: (error) => error.response.data.message,
		});
	};

	const handlePermanentDelete = (certId: string | number) => {
		const myFn = axios
			.delete<IAPIResponse>(API_ROUTE.CERTIFICATION.PERMANENT_DELETE(certId))
			.then((response) => response.data)
			.then((response) => {
				setListCert((prev) => prev.filter((cert) => cert.id !== certId));
			});

		toast.promise(myFn, {
			loading: "Deleting...",
			success: "Permanent delete successfully!",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListCert();
	}, []);
	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
		>
			<AdminHeader
				title={"Certification"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.NEW,
					text: "Add new",
					href: ROUTE_PATH.ADMIN.CERTIFICATION.NEW,
				}}
			/>
			<TableWrapper>
				<TableHeader>
					{columns.map((column) => (
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
						listCert.map((cert) => (
							<TableRow>
								<TableCell>{cert.id}</TableCell>
								<TableCell>{cert.title}</TableCell>
								<TableCell>{cert.issued_by}</TableCell>
								<TableCell>{formatDate(cert.issued_date, "onlyDate")}</TableCell>
								<TableCell>{formatDate(cert.created_at, "onlyDate")}</TableCell>
								<TableCell>
									<TableCellAction
										mode={cert.is_deleted === 1}
										onEdit={() => navigate(ROUTE_PATH.ADMIN.CERTIFICATION.DETAILS(cert.id))}
										onSoftDelete={() => handleSoftDelete(cert.id)}
										onRecover={() => handleRecover(cert.id)}
										onPermanentDelete={() => handlePermanentDelete(cert.id)}
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

Certification.defaultProps = {};

export default Certification;
