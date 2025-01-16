import AdminHeader from "../../../components/admin/admin-header";
import Wrapper from "../../../components/wrapper";
import ICON_CONFIG from "../../../configs/icon.config";
import ROUTE_PATH from "../../../configs/routes.config";

interface EmploymentProps {}

const Employment = (props: EmploymentProps) => (
	<Wrapper
		size={"full"}
		orientation={"vertical"}
		className={"px-8 py-8"}
		gapSize={"lg"}
	>
		<AdminHeader
			title={"Employment History"}
			backButton={{
				color: "default",
				size: "xl",
				variant: "solid",
				isShowBackground: false,
				startContent: ICON_CONFIG.NEW,
				text: "Add new",
				href: ROUTE_PATH.ADMIN.EMPLOYMENT.NEW,
			}}
		/>
	</Wrapper>
);

Employment.defaultProps = {};

export default Employment;
