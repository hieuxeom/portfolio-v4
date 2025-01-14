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

	const WrapperSize = `max-w-${size}`;

	return (
		<div
			className={clsx("w-full flex", GapSize[gapSize], WrapperSize, {
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
