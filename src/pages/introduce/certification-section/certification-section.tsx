import { useEffect, useState } from "react";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import useAxios from "../../../hooks/useAxios";
import AchievementRow from "../achievement-row";
import { TCertification } from "../../../types/certification";
import { IAPIResponse } from "../../../types/general";
import API_ROUTE from "../../../configs/api.config";
import Loading from "../../../components/loading";
import { formatDate } from "../../../utils/convert-datetime";

// interface CertificationSectionProps {}

const CertificationSection = () => {
	const axios = useAxios();

	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [listCertification, setListCertification] = useState<TCertification[]>([]);

	const getListCertification = () => {
		axios
			.get<IAPIResponse<TCertification[]>>(API_ROUTE.CERTIFICATION.GET_ALL)
			.then((response) => response.data)
			.then((response) => {
				setListCertification(response.results);
			})
			.finally(() => setIsFetching(false));
	};

	useEffect(() => {
		getListCertification();
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
				📜 Certification
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{isFetching ? (
					<div className={"ml-12"}>
						<Loading size={"md"} />
					</div>
				) : listCertification.length > 0 ? (
					listCertification.map((_, index) => (
						<AchievementRow
							key={index}
							title={_.title}
							organization={_.issued_by}
							time={formatDate(_.issued_date, "onlyDate")}
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

export default CertificationSection;
