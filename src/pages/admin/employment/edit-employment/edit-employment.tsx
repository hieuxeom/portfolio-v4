interface EditEmploymentProps {
	foo: string;
}

const EditEmployment = (props: EditEmploymentProps) => <div className="edit-employment-component">{props.foo}</div>;

EditEmployment.defaultProps = {
	foo: "bar",
};

export default EditEmployment;
