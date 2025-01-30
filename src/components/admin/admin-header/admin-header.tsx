import { useNavigate } from "react-router";
import Button from "../../button";
import { ButtonProps } from "../../button/button";
import Typography from "../../typography";

type BackButtonConfig = {
	text: string;
	href: string;
} & Omit<ButtonProps, "children" | "type" | "isIconOnly" | "isShowBackground">;

interface AdminHeaderProps {
	title: string;
	backButton?: BackButtonConfig;
	customElement?: React.ReactNode;
}

const AdminHeader = ({ title, backButton, customElement }: AdminHeaderProps) => {
	const navigate = useNavigate();

	return (
		<div className={"w-full flex items-center justify-between"}>
			<Typography
				type={"h1"}
				className={"text-dark/25"}
			>
				{title}
			</Typography>
			<div className={"flex items-center gap-2"}>
				{customElement}
				{backButton && (
					<Button
						size={backButton.size}
						color={backButton.color}
						startContent={backButton.startContent}
						endContent={backButton.endContent}
						onClick={() => navigate(backButton.href)}
					>
						{backButton.text}
					</Button>
				)}
			</div>
		</div>
	);
};

AdminHeader.defaultProps = {};

export default AdminHeader;
