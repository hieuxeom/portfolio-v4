interface TableBodyProps {
	children: React.ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => <tbody>{children}</tbody>;

TableBody.defaultProps = {};

export default TableBody;
