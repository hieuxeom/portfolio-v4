import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import AdminHeader from "../../../../components/admin/admin-header";
import Button from "../../../../components/button";
import FileInput from "../../../../components/file-input";
import TextArea from "../../../../components/text-area";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import API_ROUTE from "../../../../configs/api.config";
import ICON_CONFIG from "../../../../configs/icon.config";
import { modules, formats } from "../../../../configs/quill.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import useAxios from "../../../../hooks/useAxios";
import { TNewProject, TProject, TUpdateProject } from "../../../../types/project";
import Input from "../../../../components/input";
import { useParams } from "react-router";
import { IAPIResponse } from "../../../../types/general";
import { formatDate } from "../../../../utils/convert-datetime";

interface EditProjectProps {}

const EditProject = (props: EditProjectProps) => {
	const { projectId } = useParams();

	const axios = useAxios("multipart/form-data");

	const [initArticle, setInitArticle] = useState("");
	const [convertText, setConvertText] = useState<string>("Something...");
	const [projectDetails, setProjectDetails] = useState<TUpdateProject>({
		project_fullname: "",
		project_shortname: "",
		start_date: "",
		end_date: "",
		project_thumbnail: null,
		short_description: "",
		article_body: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!projectId) {
			return;
		}

		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("article_body", convertText);
		formData.append("isChangeThumbnail", projectDetails.project_thumbnail ? "true" : "false");
		formData.append("isChangeArticle", projectDetails.article_body !== initArticle ? "true" : "false");

		axios
			.patch(API_ROUTE.PROJECT.UPDATE(projectId), formData)
			.then((response) => response.data)
			.then((response) => {
				console.log(response);
			});
	};

	const getProjectDetails = (projectId: string) => {
		axios
			.get<IAPIResponse<TUpdateProject>>(API_ROUTE.PROJECT.GET_ONE(projectId))
			.then((response) => response.data)
			.then((response) => {
				setProjectDetails({
					...response.results,
					start_date: formatDate(response.results.start_date, "onlyDateReverse"),
					end_date: formatDate(response.results.end_date, "onlyDateReverse"),
					project_thumbnail: null,
				});
				setConvertText(response.results.article_body);
				setInitArticle(response.results.article_body);
			});
	};

	useEffect(() => {
		setProjectDetails((prev) => ({ ...prev, article_body: convertText }));
	}, [convertText]);

	useEffect(() => {
		if (!projectId) {
			return;
		}

		getProjectDetails(projectId);
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Add new Project"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.PROJECT.INDEX,
				}}
			/>
			<div className={"w-full grid grid-cols-2 gap-4"}>
				<form
					className={"col-span-1 w-full flex flex-col gap-4"}
					onSubmit={handleSubmit}
				>
					<div className={"w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
						<Typography
							type={"h2"}
							className={"text-primary"}
						>
							Project Information
						</Typography>
						<div className={"flex flex-col gap-4"}>
							<Input
								label={"Full project name"}
								type={"text"}
								value={projectDetails.project_fullname}
								name={"project_fullname"}
								placeholder={""}
								onChange={(e) =>
									setProjectDetails((prev) => ({ ...prev, project_fullname: e.target.value }))
								}
							/>
							<div className={"grid grid-cols-2 gap-2"}>
								<Input
									label={"Short project name"}
									type={"text"}
									value={projectDetails.project_shortname}
									name={"project_shortname"}
									placeholder={""}
									onChange={(e) =>
										setProjectDetails((prev) => ({ ...prev, project_shortname: e.target.value }))
									}
								/>
								<FileInput
									name={"project_thumbnail"}
									value={projectDetails.project_thumbnail}
									onChange={(e) => {
										setProjectDetails((prev) => ({
											...prev,
											project_thumbnail:
												e.target.files && e.target.files.length > 0 ? e.target.files : null,
										}));
									}}
								/>

								<Input
									label={"start date"}
									type={"text"}
									value={projectDetails.start_date}
									name={"start_date"}
									placeholder={""}
									onChange={(e) =>
										setProjectDetails((prev) => ({ ...prev, start_date: e.target.value }))
									}
								/>
								<Input
									label={"end date"}
									type={"text"}
									value={projectDetails.end_date}
									name={"end_date"}
									placeholder={""}
									onChange={(e) =>
										setProjectDetails((prev) => ({ ...prev, end_date: e.target.value }))
									}
								/>
							</div>
							<TextArea
								label={"Description"}
								value={projectDetails.short_description}
								name={"short_description"}
								placeholder={""}
								onChange={(e) =>
									setProjectDetails((prev) => ({ ...prev, short_description: e.target.value }))
								}
							/>
						</div>
						<div
							className={"flex justify-end"}
							// onClick={() => handleSubmit()}
						>
							<Button
								size={"lg"}
								type={"submit"}
							>
								Submit
							</Button>
						</div>
					</div>
				</form>
				<ReactQuill
					modules={modules}
					formats={formats}
					value={convertText}
					onChange={setConvertText}
					style={{
						maxHeight: "calc(100vh - 12rem)",
					}}
				/>
			</div>
		</Wrapper>
	);
};

EditProject.defaultProps = {};

export default EditProject;
