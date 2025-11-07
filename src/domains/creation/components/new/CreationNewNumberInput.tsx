import { ChevronDown, ChevronUp } from "lucide-react";

//
//
//

interface CreationNewNumberInputProps {
	checked: boolean;
	value?: number;
	onChange?: (value: number) => void;
}

//
//
//

const CreationNewNumberInput = ({
	checked,
	value,
	onChange,
}: CreationNewNumberInputProps) => {
	/**
	 *
	 */
	const handleIncrement = () => {
		if (onChange) {
			const currentValue = value ?? 0;
			onChange(currentValue + 1);
		}
	};

	/**
	 *
	 */
	const handleDecrement = () => {
		if (onChange && value && value > 1) {
			onChange(value - 1);
		}
	};

	/**
	 *
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (inputValue === "" && onChange) {
			onChange(undefined as unknown as number);
			return;
		}

		const newValue = Number.parseInt(inputValue, 10);

		if (!Number.isNaN(newValue) && newValue >= 1 && onChange) {
			onChange(newValue);
		}
	};

	/**
	 *
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			handleIncrement();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			handleDecrement();
		}
	};

	return (
		<div className="flex items-center gap-gap-3 h-[28px] pl-padding-2 border-b border-color-alpha-black100">
			<input
				type="number"
				disabled={!checked}
				value={value ?? ""}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				min={1}
				className="w-[24px] typo-body-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			/>
			{checked && (
				<div className="flex flex-col justify-between py-padding-1">
					<button
						type="button"
						onClick={handleIncrement}
						className="flex items-center justify-center"
					>
						<ChevronUp size={12} className="stroke-[3]" />
					</button>
					<button
						type="button"
						onClick={handleDecrement}
						disabled={!value || value <= 1}
						className="flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
					>
						<ChevronDown size={12} className="stroke-[3]" />
					</button>
				</div>
			)}
		</div>
	);
};

export default CreationNewNumberInput;
