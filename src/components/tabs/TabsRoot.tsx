import type { ReactNode } from "react";
import { useState } from "react";
import { TabsContext } from "@/components/tabs/TabsContext";

//
//
//

interface TabsRootProps {
	/** Controlled value of the active tab */
	value?: string;
	/** Default value for uncontrolled mode */
	defaultValue?: string;
	/** Callback when tab changes */
	onValueChange?: (value: string) => void;
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Root component for Tabs. Manages the active tab state.
 *
 * @example
 * // Uncontrolled
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>...</Tabs.List>
 * </Tabs.Root>
 *
 * @example
 * // Controlled
 * <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
 *   <Tabs.List>...</Tabs.List>
 * </Tabs.Root>
 */
const TabsRoot = ({
	value: controlledValue,
	defaultValue,
	onValueChange,
	children,
	className,
}: TabsRootProps) => {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : uncontrolledValue;

	/** Handle tab value change for both controlled and uncontrolled modes */
	const handleValueChange = (newValue: string) => {
		if (!isControlled) {
			setUncontrolledValue(newValue);
		}

		onValueChange?.(newValue);
	};

	return (
		<TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
			<div className={className}>{children}</div>
		</TabsContext.Provider>
	);
};

export default TabsRoot;
