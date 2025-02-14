import "../table.css";

interface TableHeaderProps {
	children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
	return <tr className={"border-b border-dark-50 bg-primary text-white"}>{children}</tr>;
};

export default TableHeader;
