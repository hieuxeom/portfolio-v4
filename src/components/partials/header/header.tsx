import clsx from "clsx";
import useScroll from "../../../hooks/useScroll";
import Button from "../../button";
import Typography from "../../typography";
import ICON_CONFIG from "../../../configs/icon.config";
import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
	const { scrollDir, scrollPosition } = useScroll();

	const navigate = useNavigate();

	const [cookies, setCookie, removeCookie] = useCookies(["refresh_token"]);

	useEffect(() => {
		console.log(cookies);
	}, [cookies]);

	return (
		<div
			className={clsx(
				"fixed bg-white flex justify-center w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out",
				{
					"py-16": scrollPosition.top < 100,
					"py-8 shadow-xl": scrollPosition.top >= 100,
				}
			)}
		>
			<div className={"w-full flex items-center justify-between max-w-8xl "}>
				<div className={"max-w-80"}>
					<img
						src="/logow_b.png"
						alt=""
					/>
				</div>

				<div className={"flex items-center gap-4 "}>
					<Typography type={"large"}>Homepage</Typography>
					<Typography type={"large"}>Projects</Typography>
					<Typography type={"large"}>Photos</Typography>
					<Button
						size={"lg"}
						className={"px-4"}
					>
						hello@hieutn.dev
					</Button>
					<Button
						size={"xl"}
						variant={"light"}
						isIconOnly
						onClick={() =>
							navigate(cookies.refresh_token ? ROUTE_PATH.ADMIN.ACCOUNT.INDEX : ROUTE_PATH.AUTH.LOGIN)
						}
					>
						{cookies.refresh_token ? ICON_CONFIG.AUTH : ICON_CONFIG.UNAUTH}
					</Button>
				</div>
			</div>
		</div>
	);
};

Header.defaultProps = {
	foo: "bar",
};

export default Header;
