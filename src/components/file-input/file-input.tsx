import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";

interface FileInputProps {
	title: string;
	value: FileList | null;
	name: string;
	helperText?: string;
	isMultiple: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ title, value, name, helperText, isMultiple, onChange }: FileInputProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	return (
		<div
			className="flex flex-col gap-2 cursor-pointer"
			onMouseEnter={() => setIsFocus(true)}
			onMouseLeave={() => setIsFocus(false)}
		>
			<label
				htmlFor={name}
				className={clsx("uppercase font-bold text-sm transition-all duration-300 cursor-pointer", {
					"text-dark": (value && value.length > 0) || isFocus,
					"text-dark/25": !value && !isFocus,
				})}
			>
				{title || "Upload file"}
			</label>
			<div
				className={clsx("relative flex items-center border rounded-xl shadow-sm w-full overflow-hidden", {
					"border-dark": (value && value.length > 0) || isFocus,
					"border-dark/25": !value && !isFocus,
				})}
			>
				<label
					htmlFor={name}
					className={clsx(
						"cursor-pointer px-4 py-2 text-white text-sm font-medium hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-900 transition-all duration-300",
						{
							"bg-dark": (value && value.length > 0) || isFocus,
							"bg-dark/25": !value && !isFocus,
						}
					)}
				>
					Choose File
				</label>
				<input
					id={name}
					name={name}
					type="file"
					accept=".png,.jpg,.jpeg"
					className={"hidden"}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					onChange={onChange}
					multiple={isMultiple}
				/>
				<div
					className={clsx("flex-grow px-4 py-2 text-sm ", {
						"text-dark": (value && value.length > 0) || isFocus,
						"text-dark/25": !value && !isFocus,
					})}
				>
					{value && value.length > 0 ? `${value && value.length} files selected` : "No file selected"}
				</div>
			</div>
			{helperText && (
				<p
					className={clsx("mt-1 text-sm italic transition-all duration-300", {
						"text-dark": (value && value.length > 0) || isFocus,
						"text-dark/25": !value && !isFocus,
					})}
				>
					{helperText}
				</p>
			)}
		</div>
	);
};

FileInput.defaultProps = {
	title: "",
	value: "",
	isMultiple: false,
};

export default FileInput;
