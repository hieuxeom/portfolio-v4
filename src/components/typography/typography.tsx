import clsx from "clsx";

interface TypographyProps {
	type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "large" | "muted" | "tiny";
	className?: string;
	children: React.ReactNode;
}

const Typography = ({ type, className, children }: TypographyProps) => {
	const TypoType = type !== "large" && type !== "muted" && type !== "tiny" ? type : "p";

	const MapClassNames: Record<TypographyProps["type"], string> = {
		h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
		h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
		h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
		h4: "scroll-m-20 text-xl font-semibold tracking-tight",
		h5: "scroll-m-20 text-lg font-semibold tracking-tight",
		h6: "scroll-m-20 text-base font-semibold tracking-tight",
		p: "leading-7",
		small: "text-sm leading-none",
		large: "text-lg font-semibold",
		muted: "text-muted-base text-sm",
		tiny: "text-[12px] leading-none",
	};

	return <TypoType className={clsx(MapClassNames[type], className)}>{children}</TypoType>;
};

Typography.defaultProps = {
	type: "p",
};

export default Typography;
