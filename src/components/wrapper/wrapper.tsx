import clsx from "clsx";
import { TBaseSize } from "../../types/general";

interface WrapperProps {
	size: TBaseSize;
	centerX: boolean;
	centerY: boolean;
	orientation: "horizontal" | "vertical";
	gapSize: Extract<TBaseSize, "xs" | "sm" | "md" | "lg" | "xl" | "2xl">;
	children?: React.ReactNode;
}

const Wrapper = ({ size, centerX, centerY, orientation, gapSize, children }: WrapperProps) => {
	const GapSize: Record<WrapperProps["gapSize"], string> = {
		xs: "gap-1",
		sm: "gap-2",
		md: "gap-4",
		lg: "gap-8",
		xl: "gap-12",
		"2xl": "gap-16",
	};

	const WrapperSize: Record<TBaseSize, string> = {
		xs: "max-w-xs",
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		"5xl": "max-w-5xl",
		"6xl": "max-w-6xl",
		"7xl": "max-w-7xl",
		"8xl": "max-w-8xl",
	};

	return (
		<div
			className={clsx("w-full flex", WrapperSize[size], GapSize[gapSize], {
				"flex-row": orientation === "horizontal",
				"flex-col": orientation !== "horizontal",
				"justify-center": (orientation === "horizontal" && centerX) || (orientation === "vertical" && centerY),
				"items-center": (orientation === "horizontal" && centerY) || (orientation === "vertical" && centerX),
			})}
		>
			{children}
		</div>
	);
};

Wrapper.defaultProps = {
	size: "8xl",
	orientation: "horizontal",
	centerX: false,
	centerY: false,
	gapSize: "md",
};

export default Wrapper;
