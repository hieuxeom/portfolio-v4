import { ChangeEvent, useState } from "react";
import Typography from "../typography";
import clsx from "clsx";

interface InputProps {
	type: "text" | "number" | "email" | "password";
	label: string;
	value: string | number;
	name: string;
	placeholder?: string;
	isInvalid?: boolean;
	errorMessage?: string;
	disabled?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, label, value, name, placeholder, isInvalid, errorMessage, disabled, onChange }: InputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-1">
			<label
				className={clsx("uppercase font-bold text-sm transition-all duration-300", {
					"text-dark": value !== "" || isFocus,
					"text-dark/25": value === "" && !isFocus,
				})}
				htmlFor={label}
			>
				{label}
			</label>
			<input
				className={clsx("min-w-64 border-2 rounded-xl px-4 py-2 outline-none transition-all duration-300", {
					"text-dark border-dark": value !== "" || isFocus,
					"text-dark/25 border-dark/25": value === "" && !isFocus,
				})}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				type={type}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{isInvalid && (
				<Typography
					type={"small"}
					className="text-danger"
				>
					{errorMessage}
				</Typography>
			)}
		</div>
	);
};

Input.defaultProps = {};

export default Input;
