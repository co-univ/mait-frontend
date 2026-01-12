import clsx from "clsx";
import type { ReactNode } from "react";
import { useTabsContext } from "@/components/tabs/TabsContext";

//
//
//

interface TabsContentProps {
	/** Value matching the corresponding Trigger */
	value: string;
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Content panel associated with a tab trigger.
 * Only visible when its value matches the active tab.
 *
 * @example
 * <Tabs.Content value="account">
 *   <p>Account settings content</p>
 * </Tabs.Content>
 */
const TabsContent = ({ value, children, className }: TabsContentProps) => {
	const { value: activeValue } = useTabsContext();

	if (value !== activeValue) {
		return null;
	}

	return <div className={clsx("h-full w-full", className)}>{children}</div>;
};

export default TabsContent;
