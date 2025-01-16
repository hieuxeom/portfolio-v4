interface EmploymentProps{
  foo:string
}

const Employment = (props:EmploymentProps) => (
  <div className="employment-component">
    {props.foo}
  </div>
);

Employment.defaultProps = {
  foo: 'bar',
};

 export default Employment
