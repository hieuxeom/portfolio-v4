import { useState } from "react";
import Input from "../../../components/input";
import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";
import { TSignUp } from "../../../types/auth";
import Button from "../../../components/button";
import ROUTE_PATH from "../../../configs/routes.config";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import API_ROUTE from "../../../configs/api.config";
import toast from "react-hot-toast";

// interface SignUpProps {}

const SignUp = () => {
	const navigate = useNavigate();
	const axios = useAxios();

	const [signUpForm, setSignUpForm] = useState<TSignUp>({
		email: "",
		password: "",
		confirm_password: "",
	});

	const handleSignUp = () => {
		const myFn = axios
			.post(API_ROUTE.ACCOUNT.SIGN_UP, signUpForm)
			.then((response) => response.data)
			.then(() => {
				navigate(ROUTE_PATH.AUTH.LOGIN);
			});

		toast.promise(myFn, {
			loading: "Creating account...",
			success: "Account created successfully",
			error: (error) => error.response.data.message,
		});
	};

	return (
		<div className={"bg-light w-screen h-screen flex flex-col justify-center items-center gap-8"}>
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
				className={"bg-white p-8 rounded-3xl shadow-lg h-max"}
				orientation={"vertical"}
			>
				<Typography
					type={"h2"}
					className={"text-primary"}
				>
					Create an account
				</Typography>
				<Input
					label={"Your email"}
					name={"email"}
					value={signUpForm.email}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
				/>
				<Input
					label={"Password"}
					name={"password"}
					type={"password"}
					value={signUpForm.password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
				/>
				<Input
					label={"Confirm password"}
					name={"confirm_password"}
					type={"password"}
					value={signUpForm.confirm_password}
					onChange={(e) => setSignUpForm((prev) => ({ ...prev, confirm_password: e.target.value }))}
				/>
				<Button
					size={"xl"}
					color={"primary"}
					onClick={handleSignUp}
				>
					Sign up
				</Button>
				<Typography>
					Already have an account?{" "}
					<Button
						variant={"light"}
						color={"primary"}
						onClick={() => navigate(ROUTE_PATH.AUTH.LOGIN)}
					>
						Login here
					</Button>
				</Typography>
			</Wrapper>
		</div>
	);
};

export default SignUp;
