import clsx from "clsx";
import useScroll from "../../../hooks/useScroll";
import Button from "../../button";
import ICON_CONFIG from "../../../configs/icon.config";
import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

// interface HeaderProps {}

const Header = () => {
	const { scrollPosition } = useScroll();

	const navigate = useNavigate();

	const [cookies] = useCookies(["refresh_token"]);

	const headerConfig = [
		{
			path: ROUTE_PATH.CLIENT.INDEX,
			label: "Introduce",
		},
		{
			path: ROUTE_PATH.CLIENT.MY_APPS,
			label: "My Apps",
		},
	];

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
				<div
					className={"max-w-80"}
					onClick={() => navigate(ROUTE_PATH.CLIENT.INDEX)}
				>
					<img
						src="/logow_b.png"
						alt=""
					/>
				</div>

				<div className={"flex items-center"}>
					{headerConfig.map((item, index) => (
						<Button
							key={index}
							variant={"light"}
							onClick={() => navigate(item.path)}
							className={"px-4"}
						>
							{item.label}
						</Button>
					))}
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

export default Header;
