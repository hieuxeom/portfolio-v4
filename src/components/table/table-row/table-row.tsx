import Typography from "../../typography";
import TableCell from "../table-cell";

interface TableRowProps {
	isEmpty: boolean;
	onClick?: () => void;
	children: React.ReactNode;
}

const TableRow = ({ isEmpty, onClick, children }: TableRowProps) => {
	if (isEmpty) {
		return (
			<tr>
				<TableCell colSpan={100}>
					<Typography
						type={"p"}
						className={"text-center italic"}
					>
						No data found
					</Typography>
				</TableCell>
			</tr>
		);
	}

	return (
		<tr
			onClick={onClick}
			className={"border-b last:border-b-0 border-dark-50 hover:bg-dark/10"}
		>
			{children}
		</tr>
	);
};

TableRow.defaultProps = {
	isEmpty: false,
};

export default TableRow;
