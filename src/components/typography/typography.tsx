import clsx from "clsx";

interface TypographyProps {
	type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "large" | "muted" | "tiny";
	isParagraph?: boolean;
	className?: string;
	children: React.ReactNode;
}

const Typography = ({ type = "p", isParagraph = false, className, children }: TypographyProps) => {
	const TypoType = type !== "large" && type !== "muted" && type !== "tiny" ? type : "p";

	const MapClassNames: Record<NonNullable<TypographyProps["type"]>, string> = {
		h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
		h2: "scroll-m-20 text-3xl font-semibold tracking-tight p-0",
		h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
		h4: "scroll-m-20 text-xl font-semibold tracking-tight",
		h5: "scroll-m-20 text-lg font-semibold tracking-tight",
		h6: "scroll-m-20 text-base font-semibold tracking-tight",
		p: "leading-7",
		small: "text-sm leading-none",
		large: "text-lg",
		muted: "text-muted-base text-sm",
		tiny: "text-[12px] leading-none",
	};
	const MapParagraphClassNames: Record<NonNullable<TypographyProps["type"]>, string> = {
		h1: "!leading-tight",
		h2: "pb-4",
		h3: "",
		h4: "",
		h5: "",
		h6: "",
		p: "",
		small: "",
		large: "",
		muted: "",
		tiny: "",
	};

	return (
		<TypoType className={clsx("", MapClassNames[type], className, isParagraph && MapParagraphClassNames[type])}>
			{children}
		</TypoType>
	);
};

export default Typography;
