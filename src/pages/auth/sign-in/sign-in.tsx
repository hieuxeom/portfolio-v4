import { useState } from "react";
import Input from "../../../components/input";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import { TSignIn, TSignInResponse } from "../../../types/auth";
import Button from "../../../components/button";
import { useNavigate } from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import API_ROUTE from "../../../configs/api.config";
import { useCookies } from "react-cookie";
import { IAPIResponse } from "../../../types/general";

// interface SignInProps {}

const SignIn = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [, setCookie] = useCookies(["access_token", "refresh_token", "role"]);

	const [signInForm, setSignInForm] = useState<TSignIn>({
		email: "",
		password: "",
	});

	const handleSignIn = () => {
		const myFn = axios
			.post<IAPIResponse<TSignInResponse>>(API_ROUTE.ACCOUNT.SIGN_IN, signInForm)
			.then((response) => response.data)
			.then((response) => {
				// log;
				setCookie("access_token", response.results.access_token, { maxAge: 10, path: "/" });
				setCookie("refresh_token", response.results.refresh_token, { maxAge: 60 * 60 * 24, path: "/" });
				setCookie("role", response.results.role, { maxAge: 60 * 60 * 24, path: "/" });
				navigate(ROUTE_PATH.CLIENT.INDEX);
			});

		toast.promise(myFn, {
			loading: "Signing in...",
			success: "Signed in successfully",
			error: (error) => error.response.data.message,
		});
	};

	return (
		<div className={"bg-light w-screen h-screen flex flex-col justify-center items-center gap-8 px-4"}>
			<div
				className={"w-96"}
				onClick={() => navigate(ROUTE_PATH.CLIENT.INDEX)}
			>
				<img
					src="/logow_b.png"
					alt=""
					className={"drop-shadow-2xl"}
				/>
			</div>

			<Wrapper
				size={"2xl"}
				className={"bg-white p-8 rounded-3xl shadow-lg"}
				orientation={"vertical"}
			>
				<Typography
					type={"h2"}
					className={"text-primary"}
				>
					Sign in to your account
				</Typography>
				<Input
					label={"Your email"}
					name={"email"}
					value={signInForm.email}
					onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
				/>
				<Input
					label={"Password"}
					name={"password"}
					type={"password"}
					value={signInForm.password}
					onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSignIn();
						}
					}}
				/>
				<Button
					size={"xl"}
					color={"primary"}
					onClick={handleSignIn}
				>
					Sign in
				</Button>
				<Typography>
					Don't have an account yet?{" "}
					<Button
						variant={"light"}
						color={"primary"}
						onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_UP)}
					>
						Sign up
					</Button>
				</Typography>
			</Wrapper>
		</div>
	);
};

export default SignIn;
