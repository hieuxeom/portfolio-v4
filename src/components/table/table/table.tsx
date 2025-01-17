import { useEffect } from "react";
import TableHeader from "../table-header";
import TableWrapper from "../table-wrapper";
import Button from "../../button";
import { MdDelete, MdEdit } from "react-icons/md";
import { formatDate, getLastUpdatedTime } from "../../../utils/convert-datetime";
import Typography from "../../typography";
import TableCell from "../table-cell";

export type TTableHeader = {
	key: string;
	title: string;
};

export type TActionConfig = {
	onEditAction?: () => void;
	onDeleteAction?: () => void;
	hideEditButton?: boolean;
	hideDeleteButton?: boolean;
};

interface TableProps {
	columns: TTableHeader[];
	data: any[];
	haveActionColumns: boolean;
	actionConfig: TActionConfig;
	displayKey?: string[];
}

const Table = ({ columns, data, haveActionColumns, actionConfig }: TableProps) => {
	const listColumnKeys = columns.map((column) => column.key);
	useEffect(() => {}, []);

	if (haveActionColumns) {
		const { hideDeleteButton, hideEditButton, onEditAction, onDeleteAction } = actionConfig;

		if (!hideDeleteButton && !onDeleteAction) {
			throw new Error("You must provide onDeleteAction when haveActionColumns is true");
		}

		if (!hideEditButton && !onEditAction) {
			throw new Error("You must provide onEditAction when haveActionColumns is true");
		}

		// throw new Error("You must provide onEditAction and onDeleteAction when haveActionColumns is true");
	}

	return (
		<TableWrapper>
			<TableHeader
				columns={
					haveActionColumns
						? [
								...columns,
								{
									key: "action",
									title: "Action",
								},
						  ]
						: columns
				}
			/>
			<tbody>
				{data.map((_v) => (
					<tr className={"border-b last:border-b-0 border-dark-50 hover:bg-dark/10"}>
						{listColumnKeys.map((column) => {
							if (column === "updated_at" || column === "created_at") {
								return (
									<TableCell>
										<div className={"flex flex-col gap-1"}>{formatDate(_v[column])}</div>
									</TableCell>
								);
							}
							return <TableCell>{_v[column]}</TableCell>;
						})}
						<TableCell>
							<div className={"flex justify-center items-center gap-1"}>
								{!actionConfig.hideEditButton && (
									<Button
										size={"lg"}
										color={"warning"}
										isIconOnly
										onClick={() => actionConfig.onEditAction && actionConfig.onEditAction()}
									>
										<MdEdit />
									</Button>
								)}
								{!actionConfig.hideDeleteButton && (
									<Button
										size={"lg"}
										color={"danger"}
										isIconOnly
										onClick={() => actionConfig.onDeleteAction && actionConfig.onDeleteAction()}
									>
										<MdDelete />
									</Button>
								)}
							</div>
						</TableCell>
					</tr>
				))}
			</tbody>
		</TableWrapper>
	);
};

Table.defaultProps = {
	haveActionColumns: false,
	actionConfig: {
		hideDeleteButton: false,
		hideEditButton: false,
	},
};

export default Table;
