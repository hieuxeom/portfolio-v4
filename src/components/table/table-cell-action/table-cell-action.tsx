import ICON_CONFIG from "../../../configs/icon.config";
import Button from "../../button";

interface TableCellActionProps {
	mode: boolean;
	showViewButton?: boolean;
	onRecover?: () => void;
	onPermanentDelete?: () => void;
	onSoftDelete?: () => void;
	onEdit?: () => void;
	onViewDetails?: () => void;
}

const TableCellAction = ({
	mode,
	showViewButton = false,
	onRecover,
	onSoftDelete,
	onPermanentDelete,
	onEdit,
	onViewDetails,
}: TableCellActionProps) => (
	<div className={"flex justify-center items-center gap-1"}>
		{mode ? (
			<>
				<Button
					size={"lg"}
					color={"success"}
					isIconOnly
					onClick={onRecover}
				>
					{ICON_CONFIG.RECOVER}
				</Button>

				<Button
					size={"lg"}
					color={"danger"}
					isIconOnly
					onClick={onPermanentDelete}
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
						onClick={onViewDetails}
					>
						{ICON_CONFIG.VIEW}
					</Button>
				)}
				<Button
					size={"lg"}
					color={"warning"}
					isIconOnly
					onClick={onEdit}
				>
					{ICON_CONFIG.EDIT}
				</Button>

				<Button
					size={"lg"}
					color={"danger"}
					isIconOnly
					onClick={onSoftDelete}
				>
					{ICON_CONFIG.SOFT_DELETE}
				</Button>
			</>
		)}
	</div>
);

export default TableCellAction;
