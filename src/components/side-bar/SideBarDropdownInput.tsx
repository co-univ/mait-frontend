import clsx from "clsx";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import AdjustableTextarea from "../AdjustableTextarea";
import Button from "../Button";

//
//
//

interface SideBarDropdownInputProps {
	teamName: string;
	onChange: (value: string) => void;
	onAddButtonClick: () => void;
	onCancelButtonClick: () => void;
}

//
//
//

const SideBarDropdownInput = ({
	teamName,
	onChange,
	onAddButtonClick,
	onCancelButtonClick,
}: SideBarDropdownInputProps) => {
	const [isFoceused, setIsFocused] = useState(false);

	return (
		<div className="w-full py-padding-2 px-padding-6">
			<div
				className={clsx(
					"w-full mb-padding-5 flex gap-gap-5 rounded-radius-xsmall1 border border-transparent",
					{
						"!border-color-primary-50": isFoceused,
					},
				)}
			>
				<div className="w-[24px]" />
				<Plus size={20} className="pt-padding-1" />
				<AdjustableTextarea
					value={teamName}
					placeholder="팀 이름을 입력하세요"
					onChange={(e) => onChange(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className="w-full typo-body-small"
				/>
			</div>
			<div className="flex gap-gap-5 items-center">
				<Button
					item="추가하기"
					onClick={onAddButtonClick}
					className="py-padding-4 px-padding-8 bg-color-primary-50 text-color-alpha-white100 typo-body-xsmall border-none"
				/>
				<Button
					icon={<X />}
					onClick={onCancelButtonClick}
					className="p-0 border-none"
				/>
			</div>
		</div>
	);
};

export default SideBarDropdownInput;
