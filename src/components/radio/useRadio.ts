import { useContext } from "react";
import { RadioContext, type RadioContextValue } from "./RadioContext";

/**
 * Custom hook to access radio context
 * @throws {Error} If used outside of Radio.Group
 * @returns {RadioContextValue} The radio context value
 *
 * @example
 * ```tsx
 * const { value, onChange } = useRadio();
 * ```
 */
export const useRadio = (): RadioContextValue => {
	const context = useContext(RadioContext);

	if (!context) {
		throw new Error("useRadio must be used within Radio.Group");
	}

	return context;
};

/**
 * Custom hook for radio item logic
 * @param itemValue - The value of this radio item
 * @returns Object with checked state and change handler
 *
 * @example
 * ```tsx
 * const { isChecked, handleChange } = useRadioItem('option1');
 * ```
 */
export const useRadioItem = (itemValue: string) => {
	const { value, onChange, disabled } = useRadio();

	const isChecked = value === itemValue;

	/**
	 *
	 */
	const handleChange = () => {
		if (!disabled && onChange) {
			onChange(itemValue);
		}
	};

	return {
		isChecked,
		handleChange,
		disabled,
	};
};
