import Divider from "../../components/divider";
import Typography from "../../components/typography";
import Wrapper from "../../components/wrapper";

import AnimatedQuote from "./animated-quote";

import EducationSection from "./education-section";

import CustomHelmet from "../../components/custom-helmet";
import CertificationSection from "./certification-section";
import EmploymentSection from "./employment-section";
import SkillSection from "./skill-section";

// interface IntroduceProps {}

const Introduce = () => {
	// useEffect(() => {
	// 	document.
	// }, []);

	return (
		<>
			<CustomHelmet
				title={"Introduce"}
				description={"My portfolio page"}
				keywords={["portfolio", "introduce", "website", "developer", "Tran Ngoc Hieu"]}
				author={"Tran Ngoc Hieu"}
			/>
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

				<SkillSection />
			</Wrapper>
		</>
	);
};

export default Introduce;
