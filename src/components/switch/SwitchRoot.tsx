import clsx from "clsx";
import type { ReactNode } from "react";
import type { SwitchContextValue } from "./SwitchContext";
import { SwitchContext } from "./SwitchContext";

export interface SwitchRootProps {
	/** Whether the switch is checked */
	checked: boolean;
	/** Whether the switch is disabled */
	disabled?: boolean;
	/** Whether the switch is in loading state */
	loading?: boolean;
	/** Additional CSS class names */
	className?: string;
	/** Callback when the switch state changes */
	onChange?: (checked: boolean) => void;
	/** The switch label and toggle elements */
	children: ReactNode;
}

/**
 * Switch root component that manages the state of the switch
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useState(false);
 *
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * With label:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Label>문제 공개</Switch.Label>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * With disabled state:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked} disabled>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 */
export const SwitchRoot = ({
	checked,
	disabled = false,
	loading = false,
	className,
	onChange,
	children,
}: SwitchRootProps) => {
	const contextValue: SwitchContextValue = {
		checked,
		disabled,
		loading,
		onChange,
	};

	/**
	 *
	 */
	const handleClick = () => {
		if (!disabled && !loading && onChange) {
			onChange(!checked);
		}
	};

	/**
	 *
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (
			(event.key === "Enter" || event.key === " ") &&
			!disabled &&
			!loading &&
			onChange
		) {
			event.preventDefault();
			onChange(!checked);
		}
	};

	return (
		<SwitchContext.Provider value={contextValue}>
			<div
				className={clsx(
					"inline-flex items-center gap-gap-5 cursor-pointer",
					{
						"opacity-50 cursor-not-allowed": disabled,
						"cursor-wait": loading && !disabled,
					},
					className,
				)}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				role="switch"
				aria-checked={checked}
				aria-busy={loading}
				tabIndex={disabled || loading ? -1 : 0}
			>
				{children}
			</div>
		</SwitchContext.Provider>
	);
};
