import React, { FormEvent, useState } from "react";
import ModalWrapper from "../../../../components/modal-wrapper";
import { TNewApp } from "../../../../types/app";
import Input from "../../../../components/input";
import FileInput from "../../../../components/file-input";
import Button from "../../../../components/button";
import useAxiosServer from "../../../../hooks/useAxiosServer";
import API_ROUTE from "../../../../configs/api.config";
import toast from "react-hot-toast";

interface NewAppModalProps {
	isShowModal: boolean;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAppModal = ({ isShowModal, setIsShowModal }: NewAppModalProps) => {
	const axios = useAxiosServer("multipart/form-data");

	const [newAppData, setNewAppData] = useState<TNewApp>({
		app_name: "",
		app_icon: null,
		app_link: "",
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		const myFn = axios
			.post(API_ROUTE.APP.NEW, formData)
			.then((response) => response.data)
			.then(() => {
				setIsShowModal(false);
			});

		toast.promise(myFn, {
			loading: "Adding new app...",
			success: "New app added successfully",
			error: (error) => error.response.data.message,
		});
	};

	return (
		<ModalWrapper
			isShowModal={isShowModal}
			title={"New App"}
			setIsShowModal={setIsShowModal}
		>
			<form
				className={"flex flex-col gap-4"}
				onSubmit={handleSubmit}
			>
				<Input
					label={"App name"}
					name={"app_name"}
					value={newAppData.app_name}
					onChange={(e) => setNewAppData((prev) => ({ ...prev, app_name: e.target.value }))}
				/>
				<Input
					label={"App link"}
					name={"app_link"}
					value={newAppData.app_link}
					onChange={(e) => setNewAppData((prev) => ({ ...prev, app_link: e.target.value }))}
				/>
				<FileInput
					name={"app_icon"}
					value={newAppData.app_icon}
					title={"App icon"}
					onChange={(e) => {
						setNewAppData((prev) => ({ ...prev, app_icon: e.target.files }));
					}}
				/>

				<Button
					type={"submit"}
					size={"xl"}
					color={"primary"}
				>
					Submit
				</Button>
			</form>
		</ModalWrapper>
	);
};

export default NewAppModal;
