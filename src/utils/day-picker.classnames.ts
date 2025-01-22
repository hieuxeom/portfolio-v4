import { ClassNames, DeprecatedUI, getDefaultClassNames } from "react-day-picker";

export const dayPickerWrapperClassnames = `h-max p-4 border border-dark/10 shadow-xl rounded-xl`;

export const dayPickerCustomClassnames: Partial<ClassNames> = {
	chevron: "fill-primary",
	dropdown: `${getDefaultClassNames().dropdown} text-base px-4`,
	today: "bg-secondary/50 text-white",
	selected: `!bg-primary text-white font-semibold`,
	range_start: "!bg-primary text-white ",
	range_end: "!bg-primary text-white ",
	day: "hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out",
	caption_label: "text-base inline-flex items-center",
	outside: "text-dark/25",
};
