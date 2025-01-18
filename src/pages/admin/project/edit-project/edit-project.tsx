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
import { TNewProject } from "../../../../types/project";
import Input from "../../../../components/input";

interface EditProjectProps {}

const EditProject = (props: EditProjectProps) => {
	const axios = useAxios("multipart/form-data");

	const [convertText, setConvertText] = useState<string>("Something...");
	const [newProjectData, setNewProjectData] = useState<TNewProject>({
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

		const formData = new FormData(e.target as HTMLFormElement);
		formData.append("article_body", convertText);

		axios
			.post(API_ROUTE.PROJECT.NEW, formData)
			.then((response) => response.data)
			.then((response) => {
				console.log(response);
			});
	};

	useEffect(() => {
		setNewProjectData((prev) => ({ ...prev, article_body: convertText }));
	}, [convertText]);

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
								value={newProjectData.project_fullname}
								name={"project_fullname"}
								placeholder={""}
								onChange={(e) =>
									setNewProjectData((prev) => ({ ...prev, project_fullname: e.target.value }))
								}
							/>
							<div className={"grid grid-cols-2 gap-2"}>
								<Input
									label={"Short project name"}
									type={"text"}
									value={newProjectData.project_shortname}
									name={"project_shortname"}
									placeholder={""}
									onChange={(e) =>
										setNewProjectData((prev) => ({ ...prev, project_shortname: e.target.value }))
									}
								/>
								<FileInput
									name={"project_thumbnail"}
									value={newProjectData.project_thumbnail}
									onChange={(e) => {
										setNewProjectData((prev) => ({ ...prev, project_thumbnail: e.target.files }));
									}}
								/>

								<Input
									label={"start date"}
									type={"text"}
									value={newProjectData.start_date}
									name={"start_date"}
									placeholder={""}
									onChange={(e) =>
										setNewProjectData((prev) => ({ ...prev, start_date: e.target.value }))
									}
								/>
								<Input
									label={"end date"}
									type={"text"}
									value={newProjectData.end_date}
									name={"end_date"}
									placeholder={""}
									onChange={(e) =>
										setNewProjectData((prev) => ({ ...prev, end_date: e.target.value }))
									}
								/>
							</div>
							<TextArea
								label={"Description"}
								value={newProjectData.short_description}
								name={"short_description"}
								placeholder={""}
								onChange={(e) =>
									setNewProjectData((prev) => ({ ...prev, short_description: e.target.value }))
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

					<ReactQuill
						modules={modules}
						formats={formats}
						value={convertText}
						onChange={setConvertText}
					/>
				</form>
				<div className="col-span-1 w-full flex flex-col gap-4 bg-white shadow-xl p-4 rounded-2xl">
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Display Result
					</Typography>
					{/* <div dangerouslySetInnerHTML={{ __html: convertText }}></div>
					<div>{convertText}</div> */}
				</div>
			</div>
		</Wrapper>
	);
};

EditProject.defaultProps = {};

export default EditProject;
