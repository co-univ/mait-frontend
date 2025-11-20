import clsx from "clsx";
import { Check } from "lucide-react";
import { useState } from "react";

//
//
//

interface ControlParticipantMemberInputProps {
	onMemberAdd: (memberNameWitNickname: string) => void;
}

//
//
//

const ControlParticipantMemberInput = ({
	onMemberAdd,
}: ControlParticipantMemberInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const isButtonDisabled = inputValue.trim().length === 0;

	return (
		<div
			className={clsx(
				"flex items-center justify-between gap-gap-4 rounded-radius-medium2 border border-color-gray-10 p-padding-8",
				{
					"border-color-primary-50": isFocused,
				},
			)}
		>
			<input
				type="text"
				placeholder="이름(닉네임)"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !isButtonDisabled) {
						onMemberAdd(inputValue);
					}
				}}
				className="typo-heading-small w-full border-none bg-transparent outline-none placeholder:text-color-gray-30 placeholder:typo-body-large"
			/>
			<button
				type="button"
				disabled={isButtonDisabled}
				onClick={() => onMemberAdd(inputValue)}
			>
				<Check
					size={24}
					className={clsx("text-color-gray-20", {
						"text-color-primary-50": !isButtonDisabled,
					})}
				/>
			</button>
		</div>
	);
};

export default ControlParticipantMemberInput;
