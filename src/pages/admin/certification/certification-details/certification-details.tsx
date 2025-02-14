import { useState, FormEvent, useEffect } from "react";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import AdminHeader from "../../../../components/admin/admin-header";
import FileInput from "../../../../components/file-input";
import Input from "../../../../components/input";
import Typography from "../../../../components/typography";
import Wrapper from "../../../../components/wrapper";
import API_ROUTE from "../../../../configs/api.config";
import ICON_CONFIG from "../../../../configs/icon.config";
import ROUTE_PATH from "../../../../configs/routes.config";
import useAxios from "../../../../hooks/useAxios";

import { IAPIResponse } from "../../../../types/general";
import AchievementRow from "../../../introduce/achievement-row";
import Button from "../../../../components/button";
import { dayPickerCustomClassnames, dayPickerWrapperClassnames } from "../../../../utils/day-picker.classnames";
import { DayPicker } from "react-day-picker";
import { formatDate } from "../../../../utils/convert-datetime";
import clsx from "clsx";
import { TUpdateCertification } from "../../../../types/certification";
import useAxiosServer from "../../../../hooks/useAxiosServer";

interface CertificationDetailsProps {}

const CertificationDetails = (props: CertificationDetailsProps) => {
	const { certId } = useParams();

	const axios = useAxiosServer("multipart/form-data");
	const navigate = useNavigate();

	const [certDetails, setCertDetails] = useState<TUpdateCertification>({
		title: "",
		cert_image: null,
		image_url: "",
		issued_by: "",
		issued_date: "",
	});

	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());

	const getCertificaitonDetails = (certId: string) => {
		const myFn = axios
			.get<IAPIResponse<TUpdateCertification>>(API_ROUTE.CERTIFICATION.GET_ONE(certId))
			.then((response) => response.data)
			.then((response) => {
				setCertDetails(() => ({
					...response.results,
					cert_image: null,
					isChangeCertImage: false,
					issued_date: formatDate(new Date(response.results.issued_date), "onlyDateReverse"),
				}));
				setSelectedDay(new Date(response.results.issued_date));
				setCurrentMonth(new Date(response.results.issued_date));
			});

		toast.promise(myFn, {
			loading: "Fetching...",
			success: "Successfully fetched certification details",
			error: (error) => error.response.data.message,
		});
	};

	const handleSubmitUpdateCertification = (e: FormEvent<HTMLFormElement>) => {
		if (!certId) {
			return;
		}
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		formData.append("isChangeCertImage", certDetails.cert_image ? "true" : "false");

		const myFn = axios
			.patch<IAPIResponse>(API_ROUTE.CERTIFICATION.UPDATE(certId), formData)
			.then((response) => response.data)
			.then((response) => {
				getCertificaitonDetails(certId);
			});

		toast.promise(myFn, {
			loading: "Updating...",
			success: "Successfully updated certification details",
			error: "Failed to update certification",
		});
	};

	const handleDayPickerSelect = (value: Date | undefined) => {
		if (!value) {
			return;
		}

		setSelectedDay(value);

		setCertDetails((prev) => ({
			...prev,
			issued_date: value ? formatDate(value, "onlyDateReverse") : prev.issued_date,
		}));
	};

	useEffect(() => {
		if (!certId) {
			return;
		}
		getCertificaitonDetails(certId);
	}, []);

	return (
		<Wrapper
			size={"full"}
			orientation={"vertical"}
			className={"px-8 py-8"}
			gapSize={"lg"}
		>
			<AdminHeader
				title={"Update Certification Details"}
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
						onSubmit={handleSubmitUpdateCertification}
					>
						<div className={"w-full col-span-2"}>
							<Input
								type={"text"}
								label={"Title"}
								value={certDetails.title}
								onChange={(e) => setCertDetails({ ...certDetails, title: e.target.value })}
								name={"title"}
								placeholder={"Enter certificate title..."}
							/>
						</div>
						<Input
							type={"text"}
							label={"Issued By"}
							value={certDetails.issued_by}
							onChange={(e) => setCertDetails({ ...certDetails, issued_by: e.target.value })}
							name={"issued_by"}
							placeholder={"Enter organization issuing..."}
						/>
						<FileInput
							title={"Certfication Image"}
							name={"cert_image"}
							value={certDetails.cert_image}
							onChange={(e) => {
								setCertDetails((prev) => ({
									...prev,
									cert_image: e.target.files && e.target.files.length > 0 ? e.target.files : null,
								}));
							}}
						/>

						<Input
							type={"text"}
							label={"Issued Date"}
							value={certDetails.issued_date}
							onChange={(e) => setCertDetails({ ...certDetails, issued_date: e.target.value })}
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
						title={certDetails.title}
						organization={certDetails.issued_by}
						time={certDetails.issued_date}
					/>
					<img src={certDetails.image_url} />
				</div>
			</div>
		</Wrapper>
	);
};

export default CertificationDetails;
