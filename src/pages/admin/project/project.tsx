import { useState } from "react";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ListProjectsSide from "./components/list-projects-side";
import ProjectGroupsSide from "./components/project-groups-side";

// interface ProjectProps {}

const Project = () => {
	const [updateStatus, setUpdateStatus] = useState<boolean>(false);
	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"relative px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader title={"Projects"} />

			<div className={"grid grid-cols-4 gap-4"}>
				<div className={"col-span-1"}>
					<ProjectGroupsSide triggerUpdate={setUpdateStatus} />
				</div>
				<div className={"col-span-3"}>
					<ListProjectsSide
						triggerUpdate={setUpdateStatus}
						updateStatus={updateStatus}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default Project;
