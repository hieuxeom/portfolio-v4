interface AccountProps{
  foo:string
}

const Account = (props:AccountProps) => (
  <div className="account-component">
    {props.foo}
  </div>
);

Account.defaultProps = {
  foo: 'bar',
};

 export default Account
