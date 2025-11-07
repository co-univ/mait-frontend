import clsx from "clsx";
import type { ReactNode } from "react";
import type { RadioContextValue } from "./RadioContext";
import { RadioContext } from "./RadioContext";

export interface RadioGroupProps {
	/** Whether all radio inputs in this group are disabled */
	disabled?: boolean;
	/** The name attribute for all radio inputs in this group */
	name?: string;
	/** The currently selected value */
	value?: string;
	/** Additional CSS class names */
	className?: string;
	/** The radio items */
	children: ReactNode;
	/** Callback when the selected value changes */
	onChange?: (value: string) => void;
}

/**
 * Radio group component that manages the state of radio items
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('option1');
 *
 * <Radio.Group value={value} onChange={setValue}>
 *   <Radio.Item value="option1">
 *     <Radio.Input />
 *     <Radio.Label>Option 1</Radio.Label>
 *   </Radio.Item>
 *   <Radio.Item value="option2">
 *     <Radio.Input />
 *     <Radio.Label>Option 2</Radio.Label>
 *   </Radio.Item>
 * </Radio.Group>
 * ```
 *
 * @example
 * With disabled state:
 * ```tsx
 * <Radio.Group value={value} onChange={setValue} disabled>
 *   <Radio.Item value="option1">
 *     <Radio.Input />
 *     <Radio.Label>Disabled Option</Radio.Label>
 *   </Radio.Item>
 * </Radio.Group>
 * ```
 */
export const RadioGroup = ({
	disabled = false,
	name,
	value,
	className,
	children,
	onChange,
}: RadioGroupProps) => {
	const contextValue: RadioContextValue = {
		value,
		onChange,
		name,
		disabled,
	};

	return (
		<RadioContext.Provider value={contextValue}>
			<div role="radiogroup" className={clsx(className)}>
				{children}
			</div>
		</RadioContext.Provider>
	);
};
