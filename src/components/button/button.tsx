import clsx from "clsx";
import { TBaseColors, TBaseRadius, TBaseSize, TBaseVariants } from "../../types/general";
import { useEffect } from "react";

interface ButtonProps {
	color: TBaseColors;
	variant: TBaseVariants;
	size: Extract<TBaseSize, "2xl" | "xl" | "lg" | "md" | "sm">;
	radius?: TBaseRadius;
	className?: string;
	startContent?: React.ReactNode | string;
	endContent?: React.ReactNode | string;
	children: React.ReactNode;
}

const Button = ({ color, variant, size, radius, className, startContent, endContent, children }: ButtonProps) => {
	const MapSolidButtonColor: Record<ButtonProps["color"], string> = {
		default: "border border-default bg-default text-default-foreground",
		primary: "border border-primary bg-primary text-primary-foreground",
		secondary: "border border-secondary bg-secondary text-secondary-foreground",
		danger: "border border-danger bg-danger text-danger-foreground",
		success: "border border-success bg-success text-success-foreground",
		warning: "border border-warning bg-warning text-warning-foreground",
	};

	const MapBorderedButtonColor: Record<ButtonProps["color"], string> = {
		default: "border-2 border-default bg-transparent text-default hover:bg-default hover:text-default-foreground",
		primary: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
		secondary:
			"border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",
		danger: "border-2 border-danger bg-transparent text-danger hover:bg-danger hover:text-danger-foreground",
		success: "border-2 border-success bg-transparent text-success hover:bg-success hover:text-success-foreground",
		warning: "border-2 border-warning bg-transparent text-warning hover:bg-warning hover:text-warning-foreground",
	};

	const MapLightButtonColor: Record<ButtonProps["color"], string> = {
		default: "bg-transparent text-default",
		primary: "bg-transparent text-primary",
		secondary: "bg-transparent text-secondary",
		danger: "bg-transparent text-danger",
		success: "bg-transparent text-success",
		warning: "bg-transparent text-warning",
	};

	const MapButtonSize: Record<ButtonProps["size"], string> = {
		sm: "rounded-lg py-1 px-2",
		md: "rounded-xl py-1 px-3",
		lg: "rounded-xl py-1.5 px-4",
		xl: "rounded-xl py-2 px-6",
		"2xl": "rounded-xl py-2.5 px-8",
	};

	const MapButtonTextSize: Record<ButtonProps["size"], string> = {
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

	useEffect(() => {
		console.log(radius);
	}, []);
	const ButtonClasses = getButtonClasses();

	return (
		<button
			className={clsx(
				"inline-flex items-center gap-2 transition-all duration-300",
				ButtonClasses[color],
				MapButtonSize[size],
				MapButtonTextSize[size],
				radius && MapButtonRadius[radius],
				className
			)}
		>
			{startContent}
			{children}
			{endContent}
		</button>
	);
};

Button.defaultProps = {
	color: "default",
	variant: "solid",
	size: "md",
};

export default Button;
