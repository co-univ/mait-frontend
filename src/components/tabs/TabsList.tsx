import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TabsListProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Container for tab triggers.
 *
 * @example
 * <Tabs.List>
 *   <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *   <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 * </Tabs.List>
 */
const TabsList = ({ children, className }: TabsListProps) => {
	return (
		<div
			className={clsx("flex gap-gap-5 items-center overflow-clip", className)}
		>
			{children}
		</div>
	);
};

export default TabsList;
