interface TableCellProps {
	isHeader: boolean;
	children: React.ReactNode;
}

const TableCell = ({ isHeader, children }: TableCellProps) => {
	if (isHeader) {
		return (
			<th
				// border-r last:border-r-0
				className={"text-darkborder-dark-50 p-4"}
			>
				{children}
			</th>
		);
	}

	return <td className={"table-cell text-center text-dark border-dark-50 p-4"}>{children}</td>;
};

TableCell.defaultProps = {
	isHeader: false,
};

export default TableCell;
