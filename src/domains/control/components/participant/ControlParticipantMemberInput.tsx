import clsx from "clsx";
import { Check } from "lucide-react";
import { useState } from "react";

//
//
//

// interface ControlParticipantMemberInputProps  {};

//
//
//

const ControlParticipantMemberInput = () => {
	const [isFocused, setIsFocused] = useState(false);

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
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className="typo-heading-small w-full border-none bg-transparent outline-none"
			/>
			<button type="button">
				<Check
					size={24}
					className={clsx("text-color-gray-20", {
						"text-color-primary-50": false,
					})}
				/>
			</button>
		</div>
	);
};

export default ControlParticipantMemberInput;
