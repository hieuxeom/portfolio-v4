import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export type TDropdownData = {
	key: string;
	value: string;
	textValue?: string;
};

interface DropdownProps {
	label?: string;
	placeholder?: string;
	position?: "top" | "bottom";
	inputPlaceholder?: string;
	value: string;
	onValueChange: (value: string | null) => void;
	data: TDropdownData[];
}

const Dropdown = ({
	label = "Selectionbox",
	placeholder = "Select",
	position = "bottom",
	inputPlaceholder = "Search data...",
	data,
	value,
	onValueChange,
}: DropdownProps) => {
	const [isShowList, setIsShowList] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const [currentValue, setCurrentValue] = useState<string>("");

	const [dataClone, setDataClone] = useState<TDropdownData[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setDataClone(data);
		}

		setDataClone(data.filter((_v) => _v.textValue?.includes(e.target.value) || _v.value?.includes(e.target.value)));
	};

	const onSelect = (key: string) => {
		if (key === currentValue) {
			setCurrentValue("");
			onValueChange(null);
		} else {
			setCurrentValue(key);
			onValueChange(key);
		}
		setIsShowList(false);
	};

	useEffect(() => {
		setDataClone(data);

		if (value) {
			setCurrentValue(value);
		}
	}, [data]);

	return (
		<div className={"flex items-center justify-center rounded-xl bg-white"}>
			<div className="relative w-full">
				<label
					className={clsx("uppercase font-bold text-sm transition-all duration-300", {
						"text-dark": isFocus || isShowList || currentValue !== "",
						"text-dark/25": !isFocus && !isShowList && currentValue === "",
					})}
					htmlFor={label}
				>
					{label}
				</label>
				<div>
					<button
						className={clsx(
							"relative w-full rounded-xl border-2 bg-white px-3 py-2 focus:outline-none transition-all duration-300",
							{
								"border-dark text-dark": isFocus || isShowList || currentValue !== "",
								"border-dark/25 text-dark/50": !isFocus && !isShowList && currentValue === "",
							}
						)}
						onMouseEnter={() => setIsFocus(true)}
						onMouseLeave={() => setIsFocus(false)}
						onClick={(e) => {
							e.preventDefault();
							setIsShowList(!isShowList);
						}}
					>
						<span>
							{currentValue
								? data.find((_v) => _v.key === currentValue)?.textValue ||
								  data.find((_v) => _v.key === currentValue)?.value
								: placeholder}
						</span>
						<span className={"absolute right-4 top-1/2 -translate-y-1/2"}>
							<FaChevronDown
								className={clsx("transition-all duration-300", {
									"transform rotate-180": isShowList,
								})}
							/>
						</span>
					</button>
				</div>
				{isShowList && (
					<div
						className={clsx(
							"absolute z-10 mt-2 w-full overflow-hidden rounded-xl border-2 border-dark/25 bg-white shadow-xl",
							{
								"bottom-12": position === "top",
								"": position === "bottom",
							}
						)}
						id="dropdown-list"
						ref={dropdownRef}
					>
						<input
							type="text"
							className={
								"w-full px-4 py-2 outline-none border-b-2 border-b-dark/25  transition-all duration-300 ease-in-out"
							}
							onChange={onSearch}
							placeholder={inputPlaceholder}
						/>
						<div className="scrollable-content max-h-96 h-max overflow-y-auto">
							{dataClone.map((_v) => (
								<div
									className={
										"cursor-pointer px-4 py-2 hover:bg-dark/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
									}
									key={_v.key}
									onClick={() => onSelect(_v.key)}
								>
									<span>{_v.textValue || _v.value}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dropdown;
