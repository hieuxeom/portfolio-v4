import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { IAPIResponse } from "../../types/general";
import { TProject } from "../../types/project";
import API_ROUTE from "../../configs/api.config";
import Typography from "../../components/typography";
import Button from "../../components/button";
import { FaGithub } from "react-icons/fa6";
import { FaGlobeAsia } from "react-icons/fa";
import Divider from "../../components/divider";
import { formatDate, getLastUpdatedTime } from "../../utils/convert-datetime";

interface DetailsProjectProps {}

const DetailsProject = (props: DetailsProjectProps) => {
	const { projectId } = useParams();

	const axios = useAxios();

	const [projectDetails, setProjectDetails] = useState<TProject>({
		id: 10,
		project_fullname: "APIX Platform - API marketplace for FinTechs and Financial Institutions",
		project_shortname: "APIX Platform",
		start_date: "2024-07-14T17:00:00.000Z",
		end_date: "2024-12-29T17:00:00.000Z",
		short_description:
			"APIX, created by the Monetary Authority of Singapore (MAS), is a global hub where over 100 Financial Institutions and 1,000+ FinTechs collaborate.",
		project_thumbnail:
			"https://hieutn-server.s3.ap-southeast-2.amazonaws.com/93fde8efdf593b9102cdbc79ff7ac9ebcc35f52ae72a55f98cd74527dbab0856?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZOZQFKYMAFPLTTM4%2F20250118%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250118T001510Z&X-Amz-Expires=3600&X-Amz-Signature=6c0e56d99709ce016b6488cc5cb6239d3e6c112d47b9c99a1ec55950bd1e5ef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
		created_at: "2025-01-18T00:10:06.000Z",
		updated_at: "2025-01-18T00:10:06.000Z",
		is_deleted: 0,
		article_body:
			'<h2><strong>Business Goal &amp; Opportunity</strong></h2><p>APIX has three main modules: an online digital marketplace, an event platform, and an administration system. In the digital marketplace, the user journey begins with registration, where new users provide their personal and business details to gain platform access. After registration, users can either upload or create their APIs and digital solutions on the platform, or they can explore existing offerings within the community.<img src="https://www.nattapad.com/images/apix/apix-2.png"></p><h4><br></h4><h2><strong>UX Challenge</strong></h2><p>The onboarding journey presents a significant UX challenge in this product. Uploading APIs or solutions involves gathering a variety of information and technical files, with an approval step in between. To make this journey smoother, we divided it into multiple steps, enabling users to save drafts along the way to minimize frustration.</p><p><br></p><p>Furthermore, our collaboration with the development team was crucial in identifying potential error cases and exceptions that users might encounter. This allowed us to create helpful messages to guide users when they encounter roadblocks in the process.<img src="https://www.nattapad.com/images/apix/apix-3.png"></p><p><br></p><p>Another challenge we uncovered in the product is that API products and solutions can be overwhelming with information, often causing users to become confused and abandon the subscription process. To address this, we conducted interviews with the development team and product experts to determine the key information required for users to make subscription decisions. This research informed our efforts to enhance the information structure on the API and solutions detail page.<img src="https://www.nattapad.com/images/apix/apix-4.png"></p>',
	});

	const getProjectDetails = (projectId: string) => {
		axios
			.get<IAPIResponse<TProject>>(API_ROUTE.PROJECT.GET_ONE(projectId))
			.then((response) => response.data)
			.then((response) => {
				console.log(response.results);
				// setProjectDetails(response.results);
			});
	};

	useEffect(() => {
		if (!projectId) {
			return;
		}

		// getProjectDetails(projectId);
	}, []);

	return (
		<Wrapper
			size={"full"}
			className={"p-8"}
			orientation={"vertical"}
			gapSize={"lg"}
		>
			<Typography
				type={"h1"}
				isParagraph={true}
			>
				{projectDetails.project_fullname}
			</Typography>
			<img
				src={projectDetails.project_thumbnail}
				alt=""
			/>

			<Wrapper
				size={"full"}
				orientation={"vertical"}
			>
				<p className={"italic"}>{projectDetails.short_description}</p>
				<Divider />
				<div dangerouslySetInnerHTML={{ __html: projectDetails.article_body }}></div>
			</Wrapper>
			<Divider />
			<div className={"w-full flex justify-between"}>
				<div className={"flex items-center gap-4"}>
					<Button
						size={"2xl"}
						startContent={<FaGithub />}
					>
						Github
					</Button>
					<Button
						size={"2xl"}
						startContent={<FaGlobeAsia />}
					>
						Website
					</Button>
				</div>
				<div className={"flex items-center gap-4"}>
					<Typography
						type={"small"}
						className={"italic"}
					>
						Posted on {formatDate(projectDetails.created_at, "onlyDate")}{" "}
						{projectDetails.updated_at !== projectDetails.created_at
							? ` - Updated ${getLastUpdatedTime(projectDetails.updated_at)}`
							: ""}
					</Typography>
				</div>
			</div>
		</Wrapper>
	);
};

DetailsProject.defaultProps = {};

export default DetailsProject;
