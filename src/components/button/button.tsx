import clsx from "clsx";
import { TBaseColors, TBaseRadius, TBaseSize, TBaseVariants } from "../../types/general";

export interface ButtonProps {
	color?: TBaseColors;
	variant?: TBaseVariants;
	size?: Extract<TBaseSize, "2xl" | "xl" | "lg" | "md" | "sm">;
	radius?: TBaseRadius;
	className?: string;
	startContent?: React.ReactNode | string;
	endContent?: React.ReactNode | string;
	isShowBackground?: boolean;
	type?: "button" | "submit" | "reset";
	isIconOnly?: boolean;
	onClick?: () => void;
	isDisabled?: boolean;
	children: React.ReactNode;
}

const Button = ({
	color = "default",
	variant = "solid",
	size = "md",
	radius,
	className,
	startContent,
	endContent,
	isShowBackground = false,
	type = "button",
	isIconOnly = false,
	onClick,
	isDisabled,
	children,
}: ButtonProps) => {
	const MapSolidButtonColor: Record<NonNullable<ButtonProps["color"]>, string> = {
		default:
			"border border-default bg-default text-default-foreground hover:bg-default-400 hover:border-default-400",
		primary:
			"border border-primary bg-primary text-primary-foreground hover:bg-primary-400 hover:border-primary-400",
		secondary:
			"border border-secondary bg-secondary text-secondary-foreground hover:bg-secondary-400 hover:border-secondary-400",
		danger: "border border-danger bg-danger text-danger-foreground hover:bg-danger-400 hover:border-danger-400",
		success:
			"border border-success bg-success text-success-foreground hover:bg-success-400 hover:border-success-400",
		warning:
			"border border-warning bg-warning text-warning-foreground hover:bg-warning-400 hover:border-warning-400",
	};

	const MapBorderedButtonColor: Record<NonNullable<ButtonProps["color"]>, string> = {
		default: "border-2 border-default bg-transparent text-default hover:bg-default hover:text-default-foreground",
		primary: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
		secondary:
			"border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",
		danger: "border-2 border-danger bg-transparent text-danger hover:bg-danger hover:text-danger-foreground",
		success: "border-2 border-success bg-transparent text-success hover:bg-success hover:text-success-foreground",
		warning: "border-2 border-warning bg-transparent text-warning hover:bg-warning hover:text-warning-foreground",
	};

	const MapLightButtonColor: Record<NonNullable<ButtonProps["color"]>, string> = {
		default: "bg-transparent text-default hover:text-default-300",
		primary: "bg-transparent text-primary hover:text-primary-300",
		secondary: "bg-transparent text-secondary hover:text-secondary-300",
		danger: "bg-transparent text-danger hover:text-danger-300",
		success: "bg-transparent text-success hover:text-success-300",
		warning: "bg-transparent text-warning hover:text-warning-300",
	};

	const MapLightButtonBackground: Record<NonNullable<ButtonProps["color"]>, string> = {
		default: "hover:bg-default-100 hover:!text-default",
		primary: "hover:bg-primary-100 hover:!text-primary",
		secondary: "hover:bg-secondary-100 hover:!text-secondary",
		danger: "hover:bg-danger-50 hover:!text-danger",
		success: "hover:bg-success-100 hover:!text-success",
		warning: "hover:bg-warning-100 hover:!text-warning",
	};

	const MapButtonSize: Record<NonNullable<ButtonProps["size"]>, string> = {
		sm: clsx("rounded-lg", {
			"py-1 px-2": !isIconOnly,
			"p-1": isIconOnly,
		}),
		md: clsx("rounded-xl", {
			"py-1 px-3": !isIconOnly,
			"p-2": isIconOnly,
		}),
		lg: clsx("rounded-xl", {
			"py-1.5 px-4": !isIconOnly,
			"p-3": isIconOnly,
		}),
		xl: clsx("rounded-xl", {
			"py-2 px-6": !isIconOnly,
			"p-3.5": isIconOnly,
		}),
		"2xl": clsx("rounded-xl", {
			"py-2.5 px-8": !isIconOnly,
			"p-4": isIconOnly,
		}),
	};

	const MapButtonTextSize: Record<NonNullable<ButtonProps["size"]>, string> = {
		sm: "text-sm",
		md: "tex-base",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl",
	};

	const MapButtonRadius: Record<Exclude<ButtonProps["radius"], undefined>, string> = {
		none: "!rounded-none",
		sm: "!rounded-sm",
		md: "!rounded-md",
		lg: "!rounded-lg",
		xl: "!rounded-xl",
		"2xl": "!rounded-2xl",
		"3xl": "!rounded-3xl",
		full: "!rounded-full",
	};

	const getButtonClasses = () => {
		if (variant === "solid") {
			return MapSolidButtonColor;
		}

		if (variant === "bordered") {
			return MapBorderedButtonColor;
		}

		if (variant === "light") {
			return MapLightButtonColor;
		}

		return MapSolidButtonColor;
	};

	const ButtonClasses = getButtonClasses();

	return (
		<button
			className={clsx(
				"inline-flex items-center justify-center gap-2 transition-all duration-300",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				ButtonClasses[color],
				MapButtonSize[size],
				MapButtonTextSize[size],
				radius && MapButtonRadius[radius],
				variant === "light" && isShowBackground && MapLightButtonBackground[color],
				className
			)}
			onClick={onClick}
			type={type}
			disabled={isDisabled}
		>
			{startContent}
			{children}
			{endContent}
		</button>
	);
};

export default Button;
