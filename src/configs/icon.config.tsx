import { FaAngleLeft, FaArrowRotateLeft, FaEye, FaPlus } from "react-icons/fa6";
import { MdDelete, MdDeleteForever, MdEdit } from "react-icons/md";

const ICON_CONFIG = {
	BACK: <FaAngleLeft />,
	NEW: <FaPlus />,
	EDIT: <MdEdit />,
	VIEW: <FaEye />,
	SOFT_DELETE: <MdDelete />,
	PERMANENT_DELETE: <MdDeleteForever />,
	RECOVER: <FaArrowRotateLeft />,
};

export default ICON_CONFIG;
