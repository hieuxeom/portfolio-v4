import { useEffect, useState } from "react";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import AchievementRow from "../achievement-row";
import { TEmployment } from "../../../types/employment";
import { IAPIResponse } from "../../../types/general";
import API_ROUTE from "../../../configs/api.config";
import Loading from "../../../components/loading";

interface EmploymentSectionProps {}

const EmploymentSection = (props: EmploymentSectionProps) => {
	const axios = useAxios();

	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [listEmployment, setListEmployment] = useState<TEmployment[]>([]);

	const getListEmployment = () => {
		axios
			.get<IAPIResponse<TEmployment[]>>(API_ROUTE.EMPLOYMENT.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListEmployment(response.results);
			})
			.finally(() => {
				setIsFetching(false);
			});
	};

	useEffect(() => {
		getListEmployment();
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				🏢 Employment History
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{isFetching ? (
					<div className={"ml-12"}>
						<Loading size={"md"} />
					</div>
				) : listEmployment.length > 0 ? (
					listEmployment.map((_, index) => <AchievementRow key={index} />)
				) : (
					<Typography
						type={"p"}
						className={"ml-12 italic"}
					>
						No work experience.
					</Typography>
				)}
			</ul>
		</Wrapper>
	);
};

export default EmploymentSection;
