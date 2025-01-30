import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/button";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import API_ROUTE from "../../configs/api.config";
import ICON_CONFIG from "../../configs/icon.config";
import { TApp } from "../../types/app";
import { IAPIResponse } from "../../types/general";
import AppBlock from "./app-block";
import Loading from "../../components/loading";
import useAxios from "../../hooks/useAxios";
interface MyAppsProps {
	foo: string;
}

const MyApps = (props: MyAppsProps) => {
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
			<div className={"w-full grid grid-cols-2 gap-4"}>
				{isFetching ? (
					<div className={"col-span-2 w-full flex justify-center itemsc-center"}>
						<Loading size={"xl"} />
					</div>
				) : (
					listApps.map((_, index) => (
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

MyApps.defaultProps = {
	foo: "bar",
};

export default MyApps;
