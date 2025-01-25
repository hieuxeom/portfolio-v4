import { FaPlus } from "react-icons/fa6";
import AdminHeader from "../../../../components/admin/admin-header";
import Wrapper from "../../../../components/wrapper";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Button from "../../../../components/button";
import { FormEvent, useState } from "react";
import { TNewCertification } from "../../../../types/certification";
import AchievementRow from "../../../introduce/achievement-row";
import FileInput from "../../../../components/file-input";
import useAxios from "../../../../hooks/useAxios";
import API_ROUTE from "../../../../configs/api.config";
import { IAPIResponse } from "../../../../types/general";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import { dayPickerWrapperClassnames, dayPickerCustomClassnames } from "../../../../utils/day-picker.classnames";
import { formatDate } from "../../../../utils/convert-datetime";

interface NewCertificationProps {}

const NewCertification = (props: NewCertificationProps) => {
	const axios = useAxios("multipart/form-data");
	const navigate = useNavigate();

	const [newCertData, setNewCertData] = useState<TNewCertification>({
		title: "",
		cert_image: null,
		issued_by: "",
		issued_date: "",
	});

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());

	const handleSubmitNewCertification = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(e.target);

		const formData = new FormData(e.target as HTMLFormElement);

		const myFn = axios
			.post<IAPIResponse<{ newCertId: string }>>(API_ROUTE.CERTIFICATION.NEW, formData)
			.then((response) => response.data)
			.then((response) => {
				navigate(ROUTE_PATH.ADMIN.CERTIFICATION.INDEX);
			});

		toast.promise(myFn, {
			loading: "Adding...",
			success: "Successfully added new certification",
			error: "Failed to add new certification",
		});
	};

	const handleDayPickerSelect = (value: Date | undefined) => {
		if (!value) {
			return;
		}

		setSelectedDay(value);

		setNewCertData((prev) => ({
			...prev,
			issued_date: value ? formatDate(value, "onlyDateReverse") : prev.issued_date,
		}));
	};

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Add new Certification"}
				backButton={{
					color: "default",
					size: "xl",
					variant: "solid",
					startContent: ICON_CONFIG.BACK,
					text: "Back",
					href: ROUTE_PATH.ADMIN.CERTIFICATION.INDEX,
				}}
			/>

			<div className={"grid grid-cols-2 gap-4"}>
				<div className={"col-span-1 w-full h-max bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Certificate Information
					</Typography>
					<form
						className="grid grid-cols-2 gap-4"
						onSubmit={handleSubmitNewCertification}
					>
						<div className={"w-full col-span-2"}>
							<Input
								type={"text"}
								label={"Title"}
								value={newCertData.title}
								onChange={(e) => setNewCertData({ ...newCertData, title: e.target.value })}
								name={"title"}
								placeholder={"Enter certificate title..."}
							/>
						</div>
						<Input
							type={"text"}
							label={"Issued By"}
							value={newCertData.issued_by}
							onChange={(e) => setNewCertData({ ...newCertData, issued_by: e.target.value })}
							name={"issued_by"}
							placeholder={"Enter organization issuing..."}
						/>
						<FileInput
							title={"Certfication Image"}
							name={"cert_image"}
							value={newCertData.cert_image}
							onChange={(e) => {
								setNewCertData((prev) => ({
									...prev,
									cert_image: e.target.files && e.target.files.length > 0 ? e.target.files : null,
								}));
							}}
						/>

						<Input
							type={"text"}
							label={"Issued Date"}
							value={newCertData.issued_date}
							onChange={(e) => setNewCertData({ ...newCertData, issued_date: e.target.value })}
							name={"issued_date"}
							placeholder={"Enter date issued..."}
							readOnly
						/>
						<div className={clsx("flex justify-center", dayPickerWrapperClassnames)}>
							<DayPicker
								captionLayout="dropdown"
								classNames={dayPickerCustomClassnames}
								required={false}
								month={currentMonth}
								onMonthChange={setCurrentMonth}
								mode="single"
								selected={selectedDay}
								onSelect={(e) => handleDayPickerSelect(e)}
								showOutsideDays
							/>
						</div>
						<div className={"col-span-2 flex justify-end"}>
							<Button
								size={"lg"}
								color={"primary"}
								type={"submit"}
							>
								Submit
							</Button>
						</div>
					</form>
				</div>
				<div className={"col-span-1 w-full h-max bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"}>
					<Typography
						type={"h2"}
						className={"text-primary"}
					>
						Display Result
					</Typography>
					<AchievementRow
						title={newCertData.title}
						organization={newCertData.issued_by}
						time={newCertData.issued_date}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

NewCertification.defaultProps = {};

export default NewCertification;
