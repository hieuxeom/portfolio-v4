import { ChangeEvent, useState } from "react";
import Typography from "../typography";
import clsx from "clsx";

interface InputProps {
	type?: "text" | "number" | "email" | "password";
	label?: string;
	value: string | number;
	name: string;
	placeholder?: string;
	isInvalid?: boolean;
	errorMessage?: string;
	disabled?: boolean;
	readOnly?: boolean;
	classNames?: {
		input?: string;
		label?: string;
	};
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
	type = "text",
	label,
	value,
	name,
	placeholder,
	isInvalid,
	errorMessage,
	disabled,
	readOnly,
	classNames,
	onChange,
	onKeyDown,
}: InputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-1">
			<label
				className={clsx("font-semibold transition-all duration-300", classNames && classNames.label, {
					"text-dark": value !== "" || isFocus,
					"text-dark/25": value === "" && !isFocus,
				})}
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className={clsx(
					"w-full border-2 rounded-xl px-4 py-2 outline-none transition-all duration-300",
					classNames && classNames.input,
					{
						"text-dark border-dark": value !== "" || isFocus,
						"text-dark/25 border-dark/25": value === "" && !isFocus,
						"bg-dark/20 border-dark/10 text-dark/50": disabled,
						"bg-dark/5 cursor-default": readOnly,
					}
				)}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onKeyDown={onKeyDown}
				type={type}
				id={name}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
				readOnly={readOnly}
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

export default Input;
