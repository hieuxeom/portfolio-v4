import Typography from "../../../components/typography";
import Wrapper from "../../../components/wrapper";

const SkillSection = () => {
	const listTechStacks = [
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",

		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",

		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",

		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg",
	];

	const listTools = [
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",

		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/phpstorm/phpstorm-original.svg",
	];

	const listDesignTools = [
		"https://img.icons8.com/?size=100&id=pGHcje298xSl&format=png&color=000000",
		"https://img.icons8.com/?size=100&id=UECmBSgBOvPT&format=png&color=000000",
		"https://img.icons8.com/?size=100&id=ifP93G7BXUhU&format=png&color=000000",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-line.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
		"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
	];

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				🤹🏼 My Skills
			</Typography>
			<div className={"flex flex-col gap-8"}>
				<div className={"ml-12 flex flex-col gap-2"}>
					<div
						className={
							"before:content-[''] before:bg-dark before:-ml-4 before:h-1.5 before:w-1.5 before:rounded-full flex items-center gap-2"
						}
					>
						<Typography type={"h4"}>Techstacks</Typography>
					</div>

					<div className={"flex items-center gap-8"}>
						{listTechStacks.map((_v) => (
							<img
								height="60"
								width="60"
								src={_v}
							/>
						))}
					</div>
				</div>
				<div className={"ml-12 flex flex-col gap-2"}>
					<div
						className={
							"before:content-[''] before:bg-dark before:-ml-4 before:h-1.5 before:w-1.5 before:rounded-full flex items-center gap-2"
						}
					>
						<Typography type={"h4"}>Development Tools</Typography>
					</div>

					<div className={"flex items-center gap-8"}>
						{listTools.map((_v) => (
							<img
								height="60"
								width="60"
								src={_v}
							/>
						))}
					</div>
				</div>
				<div className={"ml-12 flex flex-col gap-4"}>
					<div
						className={
							"before:content-[''] before:bg-dark before:-ml-4 before:h-1.5 before:w-1.5 before:rounded-full flex items-center gap-2"
						}
					>
						<Typography type={"h4"}>Office & Design Tools</Typography>
					</div>

					<div className={"flex items-center gap-8"}>
						{listDesignTools.map((_v) => (
							<img
								height="60"
								width="60"
								src={_v}
							/>
						))}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default SkillSection;
