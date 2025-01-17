import Typography from "../../typography";
import TableCell from "../table-cell";
import "../table.css";
import { TTableHeader } from "../table/table";
interface TableHeaderProps {
	columns: TTableHeader[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
	return (
		<tr className={"border-b border-dark-50 bg-primary text-white"}>
			{columns.map((column) => (
				<TableCell
					key={column.key}
					isHeader
				>
					{/* <Typography>{column.title}</Typography> */}
					{column.title}
				</TableCell>
			))}
		</tr>
	);
};

TableHeader.defaultProps = {
	foo: "bar",
};

export default TableHeader;
