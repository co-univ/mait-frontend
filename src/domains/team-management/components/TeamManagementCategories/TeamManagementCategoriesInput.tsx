import clsx from "clsx";
import type React from "react";
import Button from "@/components/Button";

//
//
//

const MAX_LENGTH = 40;

interface TeamManagementCategoriesInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
}

//
//
//

const TeamManagementCategoriesInput = ({
	value,
	onChange,
	onSubmit,
}: TeamManagementCategoriesInputProps) => {
	const isOverMaxLength = value.length > MAX_LENGTH;

	/**
	 *
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSubmit();
		}
	};

	return (
		<div className="flex min-w-0 w-full gap-gap-4">
			<label
				className={clsx(
					"min-w-0 flex flex-1 items-center gap-gap-3 border-b border-color-alpha-black100 cursor-text",
					{
						"border-color-point-50": isOverMaxLength,
					},
				)}
			>
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					className={clsx(
						"flex-1 min-w-0 bg-transparent outline-none typo-body-small text-color-alpha-black100",
						{
							"text-color-point-50": isOverMaxLength,
						},
					)}
				/>
				<span className="shrink-0 typo-body-xsmall text-color-alpha-black100 whitespace-nowrap">
					<span
						className={clsx({
							"text-color-point-50": isOverMaxLength,
						})}
					>
						{value.length}
					</span>{" "}
					/ {MAX_LENGTH}
				</span>
			</label>
			<Button
				disabled={value.length === 0 || isOverMaxLength}
				item="저장하기"
				onClick={onSubmit}
				className={clsx("px-padding-8 py-padding-2 typo-body-xsmall", {
					"bg-color-gray-10 text-color-gray-30 cursor-not-allowed":
						value.length === 0 || isOverMaxLength,
				})}
			/>
		</div>
	);
};

export default TeamManagementCategoriesInput;
