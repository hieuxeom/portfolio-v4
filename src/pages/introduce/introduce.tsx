import BlockQuote from "../../components/block-quote";
import Divider from "../../components/divider";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import AchievementRow from "./achievement-row";
import AnimatedQuote from "./animated-quote";

interface IntroduceProps {}

const Introduce = (props: IntroduceProps) => (
	<Wrapper
		size={"full"}
		className={"p-8"}
		orientation={"vertical"}
		gapSize={"md"}
	>
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				👋 Hey there!
			</Typography>
			<Typography
				type={"large"}
				className={"text-justify"}
			>
				My name is Tran Ngoc Hieu,
			</Typography>
			<Typography type={"large"}>
				I have just graduated with a{" "}
				<strong>Bachelor's degree in Information Technology - majoring in Website Development</strong>
			</Typography>
			<Typography type={"large"}>
				I am looking for an opportunity for a position as a <strong>Website Developer Intern</strong>{" "}
			</Typography>
			<AnimatedQuote />
		</Wrapper>
		<Divider />
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				🎓 Education
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementRow key={index} />
				))}
			</ul>
		</Wrapper>
		<Divider />
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				📜 Certification
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementRow key={index} />
				))}
			</ul>
		</Wrapper>
		<Divider />
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				🏢 Employment History
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementRow key={index} />
				))}
			</ul>
		</Wrapper>
		<Divider />
		<Wrapper
			size={"full"}
			orientation={"vertical"}
		>
			<Typography
				type={"h2"}
				isParagraph
			>
				🤹🏼 Technical Skills
			</Typography>
			<ul className={"flex flex-col gap-8 list-disc"}>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementRow key={index} />
				))}
			</ul>
		</Wrapper>
	</Wrapper>
);

Introduce.defaultProps = {};

export default Introduce;
