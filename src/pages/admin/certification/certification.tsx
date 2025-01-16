import { FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";

interface CertificationProps {}

const Certification = (props: CertificationProps) => (
	<Wrapper
		size={"full"}
		orientation={"vertical"}
		className={"px-8 py-8"}
	>
		<AdminHeader
			title={"Certification"}
			backButton={{
				color: "default",
				size: "xl",
				variant: "solid",
				isShowBackground: false,
				startContent: ICON_CONFIG.NEW,
				text: "Add new",
				href: ROUTE_PATH.ADMIN.CERTIFICATION.NEW,
			}}
		/>
	</Wrapper>
);

Certification.defaultProps = {};

export default Certification;
