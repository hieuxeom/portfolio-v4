interface TableCellProps {
	isHeader?: boolean;
	colSpan?: number;
	children: React.ReactNode;
}

const TableCell = ({ isHeader = false, colSpan = 1, children }: TableCellProps) => {
	if (isHeader) {
		return (
			<th
				colSpan={colSpan}
				// border-r last:border-r-0
				className={"text-darkborder-dark-50 p-4"}
			>
				{children}
			</th>
		);
	}

	return (
		<td
			colSpan={colSpan}
			className={"table-cell text-center text-dark border-dark-50 p-4"}
		>
			{children}
		</td>
	);
};

export default TableCell;
