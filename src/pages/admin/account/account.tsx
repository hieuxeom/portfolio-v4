import { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import TableCell from "../../../components/table/table-cell";
import TableHeader from "../../../components/table/table-header";
import TableWrapper from "../../../components/table/table-wrapper";
import Wrapper from "../../../components/wrapper";
import API_ROUTE from "../../../configs/api.config";
import ICON_CONFIG from "../../../configs/icon.config";
import useAxiosServer from "../../../hooks/useAxiosServer";
import { IAPIResponse } from "../../../types/general";
import { TAccount } from "../../../types/account";
import TableBody from "../../../components/table/table-body";
import toast from "react-hot-toast";
import TableRow from "../../../components/table/table-row";
import Loading from "../../../components/loading";
import { formatDate } from "../../../utils/convert-datetime";
import Chip from "../../../components/chip";
import Button from "../../../components/button";

// interface AccountProps {}

const Account = () => {
	const listColumns = [
		{
			key: "user_id",
			title: "User ID",
		},
		{
			key: "username",
			title: "Username",
		},
		{
			key: "email",
			title: "Email",
		},
		{
			key: "role",
			title: "Role",
		},
		{
			key: "created_at",
			title: "Created At",
		},
		{
			key: "Status",
			title: "Status",
		},
		{
			key: "action",
			title: "Action",
		},
	];

	const axios = useAxiosServer();

	const [listAccounts, setListAccounts] = useState<TAccount[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const getListAccounts = () => {
		const myFn = axios
			.get<IAPIResponse<TAccount[]>>(API_ROUTE.ACCOUNT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListAccounts(response.results);
			})
			.finally(() => setIsFetching(false));

		toast.promise(myFn, {
			loading: "Fetching...",
			success: "Fetch successfully",
			error: (error) => error.response.data.message,
		});
	};

	const handleBlockAccount = (accountId: string | number) => {
		const myFn = axios
			.patch(API_ROUTE.ACCOUNT.ACTIVE_STATUS(accountId), {
				action: "block",
			})
			.then((response) => response.data)
			.then(() => {
				setListAccounts((prev) =>
					prev.map((account) => {
						if (account.user_id === accountId) {
							account.is_active = 0;
						}
						return account;
					})
				);
			});

		toast.promise(myFn, {
			loading: "Blocking...",
			success: "Block successfully",
			error: (error) => error.response.data.message,
		});
	};
	const handleUnBlockAccount = (accountId: string | number) => {
		const myFn = axios
			.patch(API_ROUTE.ACCOUNT.ACTIVE_STATUS(accountId), {
				action: "unblock",
			})
			.then((response) => response.data)
			.then(() => {
				setListAccounts((prev) =>
					prev.map((account) => {
						if (account.user_id === accountId) {
							account.is_active = 1;
						}
						return account;
					})
				);
			});

		toast.promise(myFn, {
			loading: "Unblocking...",
			success: "Unblock successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		getListAccounts();
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"p-8"}
			gapSize={"lg"}
		>
			<AdminHeader title={"Accounts"} />
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
							<Loading />
						</TableRow>
					) : (
						listAccounts.map((account) => (
							<TableRow>
								<TableCell>{account.user_id}</TableCell>
								<TableCell>{account.username}</TableCell>
								<TableCell>{account.email}</TableCell>
								<TableCell>
									{account.role === 0 ? (
										<Chip
											size={"md"}
											color={"success"}
										>
											User
										</Chip>
									) : (
										<Chip
											size={"md"}
											color={"danger"}
										>
											Admin
										</Chip>
									)}
								</TableCell>
								<TableCell>{formatDate(account.created_at, "onlyDate")}</TableCell>
								<TableCell>
									{account.is_active === 1 ? (
										<Chip
											size={"md"}
											color={"success"}
										>
											Active
										</Chip>
									) : (
										<Chip
											size={"md"}
											color={"danger"}
										>
											Blocked
										</Chip>
									)}
								</TableCell>
								<TableCell>
									<div className={"flex justify-center items-center gap-1"}>
										{account.is_active === 1 ? (
											<Button
												isIconOnly
												size={"lg"}
												color={"danger"}
												onClick={() => handleBlockAccount(account.user_id)}
											>
												{ICON_CONFIG.BLOCK}
											</Button>
										) : (
											<Button
												isIconOnly
												size={"lg"}
												color={"success"}
												onClick={() => handleUnBlockAccount(account.user_id)}
											>
												{ICON_CONFIG.UNBLOCK}
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</TableWrapper>
		</Wrapper>
	);
};

export default Account;
