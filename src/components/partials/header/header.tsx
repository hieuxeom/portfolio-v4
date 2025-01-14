import clsx from "clsx";
import useScroll from "../../../hooks/useScroll";
import Button from "../../button";
import Typography from "../../typography";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
	const { scrollDir, scrollPosition } = useScroll();

	return (
		<div
			className={clsx(
				"fixed flex justify-center w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out",
				{
					"py-16": scrollPosition.top < 100,
					"py-8 shadow-xl": scrollPosition.top >= 100,
				}
			)}
		>
			<div className={"w-full flex items-center justify-between max-w-8xl "}>
				<div className={"max-w-80"}>
					<img
						src="/logow_b.png"
						alt=""
					/>
				</div>

				<div className={"flex items-center gap-4 "}>
					<Typography type={"large"}>Homepage</Typography>
					<Typography type={"large"}>Projects</Typography>
					<Typography type={"large"}>Photos</Typography>
					<Button
						size={"lg"}
						className={"px-4"}
					>
						hello@hieutn.dev
					</Button>
				</div>
			</div>
		</div>
	);
};

Header.defaultProps = {
	foo: "bar",
};

export default Header;
