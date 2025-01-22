import ICON_CONFIG from "../../../configs/icon.config";
import Button from "../../button";

interface TableCellActionProps {
	mode: boolean;
	showViewButton: boolean;
	handleRecover?: () => void;
	handlePermanentDelete?: () => void;
	handleSoftDelete?: () => void;
	handleEdit?: () => void;
	handleViewDetails?: () => void;
}

const TableCellAction = ({
	mode,
	showViewButton,
	handleRecover,
	handleSoftDelete,
	handlePermanentDelete,
	handleEdit,
	handleViewDetails,
}: TableCellActionProps) => (
	<div className={"flex justify-center items-center gap-1"}>
		{mode ? (
			<>
				<Button
					size={"lg"}
					color={"success"}
					isIconOnly
					onClick={handleRecover}
				>
					{ICON_CONFIG.RECOVER}
				</Button>

				<Button
					size={"lg"}
					color={"danger"}
					isIconOnly
					onClick={handlePermanentDelete}
				>
					{ICON_CONFIG.PERMANENT_DELETE}
				</Button>
			</>
		) : (
			<>
				{showViewButton && (
					<Button
						size={"lg"}
						color={"secondary"}
						isIconOnly
						onClick={handleViewDetails}
					>
						{ICON_CONFIG.VIEW}
					</Button>
				)}
				<Button
					size={"lg"}
					color={"warning"}
					isIconOnly
					onClick={handleEdit}
				>
					{ICON_CONFIG.EDIT}
				</Button>

				<Button
					size={"lg"}
					color={"danger"}
					isIconOnly
					onClick={handleSoftDelete}
				>
					{ICON_CONFIG.SOFT_DELETE}
				</Button>
			</>
		)}
	</div>
);

TableCellAction.defaultProps = {
	showViewButton: false,
};

export default TableCellAction;
