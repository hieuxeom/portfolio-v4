import clsx from "clsx";

interface TableCellProps {
	isHeader?: boolean;
	colSpan?: number;
	className?: string;
	children: React.ReactNode;
}

const TableCell = ({ isHeader = false, colSpan = 1, className, children }: TableCellProps) => {
	if (isHeader) {
		return (
			<th
				colSpan={colSpan}
				// border-r last:border-r-0
				className={clsx("text-darkborder-dark-50 p-4", className)}
			>
				{children}
			</th>
		);
	}

	return (
		<td
			colSpan={colSpan}
			className={clsx("table-cell text-center text-dark border-dark-50 p-4", className)}
		>
			{children}
		</td>
	);
};

export default TableCell;
