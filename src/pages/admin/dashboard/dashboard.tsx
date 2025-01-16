interface DashboardProps {
	foo: string;
}

const Dashboard = (props: DashboardProps) => <div className="dashboard-component">{props.foo}</div>;

Dashboard.defaultProps = {
	foo: "bar",
};

export default Dashboard;
