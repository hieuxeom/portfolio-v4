import Typography from "../../typography";
import TableCell from "../table-cell";
import "../table.css";
import { TTableHeader } from "../table/table";
interface TableHeaderProps {
	children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
	return <tr className={"border-b border-dark-50 bg-primary text-white"}>{children}</tr>;
};

TableHeader.defaultProps = {};

export default TableHeader;
