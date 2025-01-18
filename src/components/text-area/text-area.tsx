import clsx from "clsx";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Typography from "../typography";

interface TextAreaProps {
	label: string;
	value: string | number;
	name: string;
	rows: number;
	placeholder?: string;
	isInvalid?: boolean;
	errorMessage?: string;
	disabled?: boolean;
	maxLength?: number;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea = ({
	label,
	value,
	name,
	rows,
	placeholder,
	isInvalid,
	errorMessage,
	disabled,
	maxLength,
	onChange,
}: TextAreaProps) => {
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
			<textarea
				className={clsx("min-w-64 border-2 rounded-xl px-4 py-2 outline-none transition-all duration-300", {
					"text-dark border-dark": value !== "" || isFocus,
					"text-dark/25 border-dark/25": value === "" && !isFocus,
				})}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
				rows={rows}
			/>
			<div
				className={clsx("flex items-start", {
					"justify-between": maxLength && isInvalid,
					"justify-end": maxLength && !isInvalid,
				})}
			>
				{isInvalid && (
					<Typography
						type={"small"}
						className="text-danger"
					>
						{errorMessage}
					</Typography>
				)}
				{maxLength && (
					<Typography
						type={"tiny"}
						className={clsx({
							"text-danger": value.toString().length > maxLength,
							"text-success": value.toString().length <= maxLength,
						})}
					>
						({value.toString().length}/{maxLength})
					</Typography>
				)}
			</div>
		</div>
	);
};

TextArea.defaultProps = {
	rows: 3,
	maxLength: 255,
};

export default TextArea;
