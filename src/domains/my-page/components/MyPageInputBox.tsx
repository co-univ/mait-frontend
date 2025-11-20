import { useEffect, useRef } from "react";

//
//
//

interface MyPageInputBoxProps {
	label: string;
	value: string;
	onChange?: (value: string) => void;
	isEditable?: boolean;
	autoFocus?: boolean;
}

//
//
//

const MyPageInputBox = ({
	label,
	value,
	onChange,
	isEditable = false,
	autoFocus = false,
}: MyPageInputBoxProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

  //
	useEffect(() => {
		if (isEditable && autoFocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditable, autoFocus]);

	return (
		<div className="flex flex-col gap-padding-4 w-full">
			<p className="typo-body-medium">{label}</p>
			{isEditable ? (
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					className="w-full h-[50px] px-gap-8 py-gap-6 bg-white border-gray-20 border-[1px] rounded-radius-medium1 typo-body-medium focus:outline-none focus:border-primary-50"
				/>
			) : (
				<div className="w-full h-[50px] px-gap-8 py-gap-6 bg-white border-gray-20 border-[1px] rounded-radius-medium1 flex items-center">
					<p className="typo-body-medium">{value}</p>
				</div>
			)}
		</div>
	);
};

export default MyPageInputBox;
