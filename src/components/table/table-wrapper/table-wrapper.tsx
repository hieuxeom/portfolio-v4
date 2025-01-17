import "../table.css";

interface TableWrapperProps {
	children: React.ReactNode;
}

const TableWrapper = ({ children }: TableWrapperProps) => (
	<div className={"w-full bg-white rounded-2xl shadow-xl overflow-hidden p-4"}>
		<div className={"w-full border border-dark-50 rounded-lg overflow-hidden"}>
			<table className={"w-full border-collapse"}>{children}</table>
		</div>
	</div>
);

TableWrapper.defaultProps = {};

export default TableWrapper;
