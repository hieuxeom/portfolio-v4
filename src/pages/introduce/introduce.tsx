import { useEffect } from "react";
import BlockQuote from "../../components/block-quote";
import Divider from "../../components/divider";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";
import useAxios from "../../hooks/useAxios";
import AchievementRow from "./achievement-row";
import AnimatedQuote from "./animated-quote";
import Education from "../admin/education";
import EducationSection from "./education-section";
import Certification from "../admin/certification";
import CertificationSection from "./certification-section";
import EmploymentSection from "./employment-section";

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
			<AnimatedQuote renderText={"Let's think, then plan and do it."} />
		</Wrapper>

		<Divider />

		<EducationSection />

		<Divider />

		<CertificationSection />

		<Divider />

		<EmploymentSection />

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
			{/* <ul className={"flex flex-col gap-8 list-disc"}>
				{Array.from({ length: 3 }).map((_, index) => (
					<AchievementRow key={index} />
				))}
			</ul> */}
		</Wrapper>
	</Wrapper>
);

export default Introduce;
