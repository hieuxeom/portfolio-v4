import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { IAPIResponse } from "../../types/general";
import { TProjectResponse } from "../../types/project";
import API_ROUTE from "../../configs/api.config";
import Typography from "../../components/typography";
import Button from "../../components/button";
import { FaGithub } from "react-icons/fa6";
import { FaGlobeAsia } from "react-icons/fa";
import Divider from "../../components/divider";
import { formatDate, getLastUpdatedTime } from "../../utils/convert-datetime";
import BlockQuote from "../../components/block-quote";
import Loading from "../../components/loading";
import CustomImage from "../../components/custom-image";
import CustomHelmet from "../../components/custom-helmet";

// interface DetailsProjectProps {}

const DetailsProject = () => {
	const { projectId } = useParams();

	const axios = useAxios();

	const [projectDetails, setProjectDetails] = useState<TProjectResponse>();

	const getProjectDetails = (projectId: string) => {
		axios
			.get<IAPIResponse<TProjectResponse>>(API_ROUTE.PROJECT.GET_ONE(projectId))
			.then((response) => response.data)
			.then((response) => {
				setProjectDetails(response.results);
			});
	};

	useEffect(() => {
		if (!projectId) {
			return;
		}

		getProjectDetails(projectId);
	}, [projectId]);

	function sliceText(short_description: string, arg1: number): string {
		throw new Error("Function not implemented.");
	}

	return (
		<>
			{projectDetails && (
				<CustomHelmet
					title={projectDetails?.project_fullname}
					description={projectDetails?.short_description.slice(0, 100)}
					keywords={[
						projectDetails.project_shortname,
						...projectDetails.project_fullname.split(" "),
						"project",
					]}
				/>
			)}
			<Wrapper
				size={"full"}
				className={"p-8"}
				orientation={"vertical"}
				gapSize={"lg"}
			>
				{!projectDetails ? (
					<div className={"w-full flex justify-center"}>
						<Loading size={"xl"} />
					</div>
				) : (
					<>
						<Typography
							type={"h1"}
							isParagraph={true}
						>
							{projectDetails.project_fullname}
						</Typography>
						<BlockQuote size={"md"}>
							Posted on {formatDate(projectDetails.created_at, "onlyDate")}{" "}
							{projectDetails.updated_at !== projectDetails.created_at
								? ` - Updated ${getLastUpdatedTime(projectDetails.updated_at)}`
								: ""}
						</BlockQuote>
						{/* <img
						src={projectDetails.project_thumbnail}
						alt=""
						width={1920}
						height={1080}
					/> */}

						<CustomImage src={projectDetails.project_thumbnail} />

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
								{projectDetails.github_link && (
									<Button
										size={"xl"}
										startContent={<FaGithub />}
										onClick={() => window.open(projectDetails.github_link, "_blank")}
									>
										Github
									</Button>
								)}
								{projectDetails.demo_link && (
									<Button
										size={"xl"}
										startContent={<FaGlobeAsia />}
										onClick={() => window.open(projectDetails.demo_link, "_blank")}
									>
										Demo
									</Button>
								)}
							</div>
						</div>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default DetailsProject;
