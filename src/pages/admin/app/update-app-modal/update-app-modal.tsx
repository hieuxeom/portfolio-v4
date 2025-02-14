import React, { FormEvent, useEffect, useState } from "react";
import ModalWrapper from "../../../../components/modal-wrapper";
import { TUpdateApp, TApp } from "../../../../types/app";
import Input from "../../../../components/input";
import FileInput from "../../../../components/file-input";
import Button from "../../../../components/button";
import useAxiosServer from "../../../../hooks/useAxiosServer";
import API_ROUTE from "../../../../configs/api.config";
import toast from "react-hot-toast";
import Typography from "../../../../components/typography";
import clsx from "clsx";

interface UpdateAppModalProps {
	currentAppDetails: TApp;
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAppModal = ({ currentAppDetails, isShowModal, setIsShowModal }: UpdateAppModalProps) => {
	const axios = useAxiosServer("multipart/form-data");

	// const [isFetching, setIsFetching] = useState<boolean>(true);

	const [appDetails, setAppDetails] = useState<TUpdateApp>({
		app_name: "",
		app_link: "",
		app_icon: null,
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!appDetails) return;

		const formData = new FormData(e.target as HTMLFormElement);

		formData.append("is_change_icon", appDetails.app_icon ? "true" : "false");
		if (appDetails.app_icon) {
			formData.append("app_icon", appDetails.app_icon[0]);
			formData.delete("new_app_icon");
		}

		const myFn = axios
			.patch(API_ROUTE.APP.UPDATE_INFO(currentAppDetails.app_id), formData)
			.then((response) => response.data)
			.then(() => {
				setIsShowModal(false);
			});

		toast.promise(myFn, {
			loading: "Updating app information...",
			success: "Updated app information successfully",
			error: (error) => error.response.data.message,
		});
	};

	useEffect(() => {
		setAppDetails({
			app_name: currentAppDetails.app_name,
			app_link: currentAppDetails.app_link,
			app_icon: null,
		});
	}, [currentAppDetails]);

	return (
		<ModalWrapper
			isShowModal={isShowModal}
			title={"Update app information"}
			setIsShowModal={setIsShowModal}
		>
			{appDetails && (
				<form
					className={"flex flex-col gap-4"}
					onSubmit={handleSubmit}
				>
					<Input
						label={"App name"}
						name={"app_name"}
						value={appDetails.app_name}
						onChange={(e) => setAppDetails((prev) => ({ ...prev, app_name: e.target.value }))}
					/>
					<Input
						label={"App link"}
						name={"app_link"}
						value={appDetails.app_link}
						onChange={(e) => setAppDetails((prev) => ({ ...prev, app_link: e.target.value }))}
					/>
					<div className={"grid grid-cols-4 gap-4 items-start"}>
						<div className={"col-span-3"}>
							<FileInput
								name={"new_app_icon"}
								value={appDetails.app_icon}
								title={"App icon"}
								onChange={(e) => {
									console.log(e);
									setAppDetails((prev) => ({ ...prev, app_icon: e.target.files }));
								}}
							/>
						</div>
						<div className={"col-span-1 flex flex-col justify-center items-center gap-1"}>
							<Typography
								className={clsx(
									"uppercase font-bold text-sm transition-all duration-300 cursor-pointer text-dark"
								)}
							>
								Current Icon
							</Typography>
							<img
								src={currentAppDetails.app_icon}
								alt="current_icon"
								width={50}
								height={50}
							/>
						</div>
					</div>
					<div className={"flex items-center justify-end gap-2"}>
						<Button
							size={"xl"}
							color={"danger"}
							variant={"light"}
							isShowBackground
							onClick={() => {
								setIsShowModal(false);
							}}
						>
							Close
						</Button>

						<Button
							type={"submit"}
							size={"xl"}
							color={"primary"}
						>
							Submit
						</Button>
					</div>
				</form>
			)}
		</ModalWrapper>
	);
};

export default UpdateAppModal;
