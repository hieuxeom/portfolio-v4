import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../components/admin/admin-header";
import Input from "../../../components/input";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";

interface EducationProps {}

const Education = (props: EducationProps) => (
	<Wrapper
		size={"full"}
		orientation={"vertical"}
		className={"px-8 py-8"}
	>
		<AdminHeader
			title={"Education"}
			backButton={{
				color: "default",
				size: "xl",
				variant: "solid",
				isShowBackground: false,
				startContent: ICON_CONFIG.NEW,
				text: "Add new",
				href: ROUTE_PATH.ADMIN.EDUCATION.NEW,
			}}
		/>
	</Wrapper>
);

Education.defaultProps = {};

export default Education;
