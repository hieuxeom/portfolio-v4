import React, { useState } from "react";
import clsx from "clsx";
import "./modal.css";
import Button from "../button";
import ICON_CONFIG from "../../configs/icon.config";
import Typography from "../typography";

interface ModalWrapperProps {
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	children: React.ReactNode;
}

const ModalWrapper = ({ title, isShowModal = false, setIsShowModal, children }: ModalWrapperProps) => {
	return (
		<>
			<div
				className={clsx("backdrop z-10 absolute top-0 left-0 w-full h-screen bg-dark-500/40", {
					showBackdrop: isShowModal,
				})}
				onClick={() => setIsShowModal(false)}
			></div>
			<div
				className={clsx(
					"modal absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center gap-4",
					{
						showModal: isShowModal,
					}
				)}
			>
				<div className={"relative w-3/4 h-max bg-white px-8 py-4 rounded-2xl shadow-2xl flex flex-col gap-4"}>
					<div className={"w-full flex justify-between items-center"}>
						<Typography type={"h2"}>{title}</Typography>
						<Button
							isIconOnly={true}
							variant={"light"}
							isShowBackground
							color={"danger"}
							size={"lg"}
							className={"group"}
							onClick={() => setIsShowModal(false)}
						>
							{ICON_CONFIG.CLOSE}
						</Button>
					</div>
					{children}
				</div>
			</div>
		</>
	);
};

export default ModalWrapper;
