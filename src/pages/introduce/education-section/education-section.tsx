import { useEffect, useState } from "react";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import AchievementRow from "../achievement-row";
import { TEducation } from "../../../types/education";
import API_ROUTE from "../../../configs/api.config";
import Loading from "../../../components/loading";
import { IAPIResponse } from "../../../types/general";
import { formatDate } from "../../../utils/convert-datetime";

interface EducationSectionProps {}

const EducationSection = (props: EducationSectionProps) => {
	const axios = useAxios();

	const [isFetching, setIsFetching] = useState<boolean>(true);

	const [listEducation, setListEducation] = useState<TEducation[]>([]);

	const getListEducation = () => {
		axios
			.get<IAPIResponse<TEducation[]>>(API_ROUTE.EDUCATION.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListEducation(response.results);
			})
			.finally(() => setIsFetching(false));
	};

	useEffect(() => {
		getListEducation();
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
				🎓 Education
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{isFetching ? (
					<div className={"ml-12"}>
						<Loading size={"md"} />
					</div>
				) : listEducation.length > 0 ? (
					listEducation.map((_, index) => (
						<AchievementRow
							key={index}
							title={_.title}
							organization={_.organization}
							time={`${formatDate(_.time_start, "onlyMonthYear")} - ${formatDate(
								_.time_end,
								"onlyMonthYear"
							)}`}
						/>
					))
				) : (
					<Typography
						type={"p"}
						className={"ml-12 italic"}
					>
						No educational background.
					</Typography>
				)}
			</ul>
		</Wrapper>
	);
};

export default EducationSection;
