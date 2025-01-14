import clsx from "clsx";
import { TBaseColors, TBaseRadius, TBaseSize, TBaseVariants } from "../../types/general";
import { useEffect } from "react";

interface ButtonProps {
	color: TBaseColors;
	variant: TBaseVariants;
	size: Extract<TBaseSize, "2xl" | "xl" | "lg" | "md" | "sm">;
	radius?: TBaseRadius;
	children: React.ReactNode;
}

const Button = ({ color, variant, size, radius, children }: ButtonProps) => {
	const MapSolidButtonColor: Record<ButtonProps["color"], string> = {
		default: "border border-default bg-default text-default-foreground",
		primary: "border border-primary bg-primary text-primary-foreground",
		secondary: "border border-secondary bg-secondary text-secondary-foreground",
		danger: "border border-danger bg-danger text-danger-foreground",
		success: "border border-success bg-success text-success-foreground",
		warning: "border border-warning bg-warning text-warning-foreground",
	};

	const MapBorderedButtonColor: Record<ButtonProps["color"], string> = {
		default: "border border-default bg-default text-default-foreground",
		primary: "border border-primary bg-primary text-primary-foreground",
		secondary: "border border-secondary bg-secondary text-secondary-foreground",
		danger: "border border-danger bg-danger text-danger-foreground",
		success: "border border-success bg-success text-success-foreground",
		warning: "border border-warning bg-warning text-warning-foreground",
	};

	const MapButtonSize: Record<ButtonProps["size"], string> = {
		sm: "rounded-md py-1 px-6",
		md: "rounded-md py-1.5 px-8",
		lg: "rounded-lg py-2 px-12",
		xl: "rounded-xl py-2.5 px-14",
		"2xl": "rounded-xl py-2.5 px-16",
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

		return MapSolidButtonColor;
	};

	useEffect(() => {
		console.log(radius);
	}, []);
	const ButtonClasses = getButtonClasses();

	return (
		<button
			className={clsx(
				ButtonClasses[color],
				MapButtonSize[size],
				MapButtonTextSize[size],
				radius && MapButtonRadius[radius]
			)}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	color: "default",
	variant: "bordered",
	size: "md",
};

export default Button;
