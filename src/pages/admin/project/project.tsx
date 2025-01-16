interface ProjectProps {
	foo: string;
}

const Project = (props: ProjectProps) => <div className="project-component">{props.foo}</div>;

Project.defaultProps = {
	foo: "bar",
};

export default Project;
