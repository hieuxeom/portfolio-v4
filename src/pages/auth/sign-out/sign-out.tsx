import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";

import Loading from "../../../components/loading";
import toast from "react-hot-toast";

// interface SignOutProps {}

const SignOut = () => {
	const navigate = useNavigate();
	const [, , removeCookie] = useCookies(["access_token", "refresh_token"]);

	const handleSignOut = () => {
		navigate(ROUTE_PATH.AUTH.LOGIN);
		removeCookie("access_token");
		removeCookie("refresh_token");
		toast.success("Signed out successfully");
	};

	useEffect(() => {
		handleSignOut();
	}, []);

	return (
		<div className={"h-screen w-screen flex justify-center items-center"}>
			<Loading />
		</div>
	);
};

export default SignOut;
