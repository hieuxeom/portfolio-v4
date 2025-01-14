interface IntroduceProps {
	foo: string;
}

const Introduce = (props: IntroduceProps) => <div className="introduce-component">Introduce Component</div>;

Introduce.defaultProps = {
	foo: "bar",
};

export default Introduce;
