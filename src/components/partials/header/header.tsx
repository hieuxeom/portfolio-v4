import clsx from "clsx";
import useScroll from "../../../hooks/useScroll";
import Button from "../../button";
import ICON_CONFIG from "../../../configs/icon.config";
import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

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

	const [isOpenMiniHeader, setIsOpenMiniHeader] = useState<boolean>(false);

	useEffect(() => {
		console.log(cookies);
	}, [cookies]);

	return (
		<div
			className={clsx(
				"fixed bg-white flex justify-center w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out lg:px-8 px-4 shadow-sm",
				{
					"lg:py-16 py-4": scrollPosition.top < 100,
					"lg:py-8 py-4 lg:shadow-xl shadow-md": scrollPosition.top >= 100,
				}
			)}
		>
			<div
				className={
					"w-full flex items-center justify-between 2xl:max-w-8xl xl:max-w-6xl lg:max-w-5xl max-w-full"
				}
			>
				<div
					className={"lg:max-w-80 max-w-40"}
					onClick={() => navigate(ROUTE_PATH.CLIENT.INDEX)}
				>
					<img
						src="/logow_b.png"
						alt=""
					/>
				</div>

				<div className={"tablet-up lg:flex lg:items-center hidden"}>
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
					{cookies.refresh_token && (
						<Button
							size={"xl"}
							variant={"light"}
							color={"danger"}
							isIconOnly
							onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_OUT)}
						>
							{ICON_CONFIG.LOG_OUT}
						</Button>
					)}
				</div>
				<div
					className={clsx("mobile-up lg:hidden", {
						hidden: !isOpenMiniHeader,
						"absolute bg-white shadow-lg left-0 top-16 w-full flex flex-col gap-4": isOpenMiniHeader,
					})}
				>
					{headerConfig.map((item, index) => (
						<Button
							key={index}
							variant={"light"}
							onClick={() => {
								navigate(item.path);
								setIsOpenMiniHeader(false);
							}}
							className={"px-4"}
						>
							{item.label}
						</Button>
					))}
					<div className={"flex flex-col"}>
						<Button
							size={"xl"}
							variant={"light"}
							isIconOnly
							onClick={() => {
								setIsOpenMiniHeader(false);
								navigate(
									cookies.refresh_token ? ROUTE_PATH.ADMIN.ACCOUNT.INDEX : ROUTE_PATH.AUTH.LOGIN
								);
							}}
						>
							{cookies.refresh_token ? ICON_CONFIG.AUTH : ICON_CONFIG.UNAUTH}
						</Button>
						{cookies.refresh_token && (
							<Button
								size={"xl"}
								variant={"light"}
								color={"danger"}
								isIconOnly
								onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_OUT)}
							>
								{ICON_CONFIG.LOG_OUT}
							</Button>
						)}
					</div>
				</div>
				<Button
					size={"md"}
					radius={"md"}
					isIconOnly
					className={"lg:hidden"}
					onClick={() => setIsOpenMiniHeader(!isOpenMiniHeader)}
				>
					{ICON_CONFIG.MENU}
				</Button>
			</div>
		</div>
	);
};

export default Header;
