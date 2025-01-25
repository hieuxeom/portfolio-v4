import { FaAngleLeft, FaArrowRightFromBracket, FaArrowRotateLeft, FaEye, FaPlus, FaUserShield } from "react-icons/fa6";
import { MdDelete, MdDeleteForever, MdEdit } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";

const ICON_CONFIG = {
	BACK: <FaAngleLeft />,
	NEW: <FaPlus />,
	EDIT: <MdEdit />,
	VIEW: <FaEye />,
	SOFT_DELETE: <MdDelete />,
	PERMANENT_DELETE: <MdDeleteForever />,
	RECOVER: <FaArrowRotateLeft />,
	AUTH: <FaUserShield />,
	UNAUTH: <BsShieldLockFill />,
	LOG_OUT: <FaArrowRightFromBracket className={"-scale-x-100"} />,
};

export default ICON_CONFIG;
