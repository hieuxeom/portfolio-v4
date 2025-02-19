import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Wrapper from "../../components/wrapper";
import API_ROUTE from "../../configs/api.config";

import { TApp } from "../../types/app";
import { IAPIResponse } from "../../types/general";
import AppBlock from "./app-block";
import Loading from "../../components/loading";
import useAxios from "../../hooks/useAxios";

// interface MyAppsProps {}

const MyApps = () => {
	const axios = useAxios();

	const [listApps, setListApps] = useState<TApp[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const getListApps = () => {
		const myFn = axios
			.get<IAPIResponse<TApp[]>>(API_ROUTE.APP.GET_ALL, {
				params: {
					filter: "onlyShow",
				},
			})
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

	useEffect(() => {
		getListApps();
	}, []);
	return (
		<Wrapper size={"full"}>
			<div className={"z-0 w-full grid lg:grid-cols-2 grid-cols-1 gap-4 px-4"}>
				{isFetching ? (
					<div className={"col-span-2 w-full flex justify-center itemsc-center"}>
						<Loading size={"xl"} />
					</div>
				) : (
					listApps.map((_) => (
						<AppBlock
							appName={_.app_name}
							appIcon={_.app_icon}
							key={_.app_id}
							appLink={_.app_link}
						/>
					))
				)}
			</div>
		</Wrapper>
	);
};

export default MyApps;
