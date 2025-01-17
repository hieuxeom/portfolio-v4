import { FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../../components/admin/admin-header";
import Wrapper from "../../../../components/wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Button from "../../../../components/button";
import { useState } from "react";
import { TNewCertification } from "../../../../types/certification";
import AchievementRow from "../../../introduce/achievement-row";

interface NewCertificationProps {}

const NewCertification = (props: NewCertificationProps) => {
	const [newCertData, setNewCertData] = useState<TNewCertification>({
		title: "",
		issued_by: "",
		issued_date: "",
		img_name: "",
	});

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Add new Certification"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					isShowBackground: false,
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.CERTIFICATION.INDEX,
				}}
			/>

			<div className={"grid grid-cols-2 gap-4"}>
				<div className={"col-span-1 w-full h-max bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Certificate Information
					</Typography>
					<div className="grid grid-cols-2 gap-4">
						<Input
							type={"text"}
							label={"Title"}
							value={newCertData.title}
							onChange={(e) => setNewCertData({ ...newCertData, title: e.target.value })}
							name={"cert-title"}
							placeholder={"Enter certificate title..."}
						/>
						<Input
							type={"text"}
							label={"Image"}
							value={newCertData.img_name}
							onChange={(e) => setNewCertData({ ...newCertData, title: e.target.value })}
							name={"cert-image"}
							placeholder={"Upload certificate image..."}
						/>
						<Input
							type={"text"}
							label={"Issued By"}
							value={newCertData.issued_by}
							onChange={(e) => setNewCertData({ ...newCertData, issued_by: e.target.value })}
							name={"cert-issued-by"}
							placeholder={"Enter organization issuing..."}
						/>
						<Input
							type={"text"}
							label={"Issued Date"}
							value={newCertData.issued_date}
							onChange={(e) => setNewCertData({ ...newCertData, issued_date: e.target.value })}
							name={"cert-issued-date"}
							placeholder={"Enter date issued..."}
						/>
					</div>
					<div className={"flex justify-end"}>
						<Button
							size={"lg"}
							color={"primary"}
						>
							Submit
						</Button>
					</div>
				</div>
				<div className={"col-span-1 w-full h-max bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
					<Typography type={"h2"}>Display Result</Typography>
					<AchievementRow
						title={newCertData.title}
						organization={newCertData.issued_by}
						time={newCertData.issued_date}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

NewCertification.defaultProps = {};

export default NewCertification;
