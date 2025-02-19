import {
	FaAngleLeft,
	FaAngleRight,
	FaArrowRightFromBracket,
	FaArrowRotateLeft,
	FaBan,
	FaBars,
	FaEye,
	FaFloppyDisk,
	FaLockOpen,
	FaPlus,
	FaUserShield,
	FaXmark,
} from "react-icons/fa6";
import { MdDelete, MdDeleteForever, MdEdit } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";

const ICON_CONFIG = {
	MENU: <FaBars />,
	BACK: <FaAngleLeft />,
	NEXT: <FaAngleRight />,
	NEW: <FaPlus />,
	EDIT: <MdEdit />,
	VIEW: <FaEye />,
	SOFT_DELETE: <MdDelete />,
	PERMANENT_DELETE: <MdDeleteForever />,
	RECOVER: <FaArrowRotateLeft />,
	AUTH: <FaUserShield />,
	UNAUTH: <BsShieldLockFill />,
	LOG_OUT: <FaArrowRightFromBracket className={"-scale-x-100"} />,
	BLOCK: <FaBan />,
	UNBLOCK: <FaLockOpen />,
	CLOSE: <FaXmark />,
	SAVE: <FaFloppyDisk />,
};

export default ICON_CONFIG;
