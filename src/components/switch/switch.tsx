import { useEffect, useRef, useState } from "react";
import { TBaseSize } from "../../types/general";

interface SwitchProps {
	label?: string;
	name: string;
	size?: Extract<TBaseSize, "sm" | "md" | "lg">;
	isChecked: boolean;
	onChecked?: (value: boolean) => void;
}

const Switch = ({ label = "", name, size = "md", isChecked, onChecked }: SwitchProps) => {
	const MapDivClass: Record<NonNullable<SwitchProps["size"]>, string> = {
		sm: "relative w-10 h-6 border-2 border-dark/50 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:duration-300",
		md: "relative w-14 h-8 border-2 border-dark/50 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:duration-300",
		lg: "relative w-[4.5rem] h-10 border-2 border-dark/50 bg-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:after:duration-300",
	};

	const MapSpanClass: Record<NonNullable<SwitchProps["size"]>, string> = {
		sm: "ms-2 text-sm font-medium text-primary",
		md: "ms-2 text-base font-medium text-primary",
		lg: "ms-2 text-xl font-medium text-primary",
	};

	const [checked, setChecked] = useState<boolean>(isChecked);

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChecked) {
			onChecked(e.target.checked);
		}

		setChecked(e.target.checked);
	};

	return (
		<label className="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				value=""
				className="sr-only peer"
				name={name}
				checked={checked}
				onChange={(e) => handleSwitchChange(e)}
			/>

			<div className={MapDivClass[size]}></div>
			<span className={MapSpanClass[size]}>{label}</span>
		</label>
	);
};

export default Switch;
