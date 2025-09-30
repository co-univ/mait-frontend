import clsx from "clsx";
import type { ReactNode } from "react";
import { useTabsContext } from "@/components/tabs/TabsContext";

//
//
//

interface TabsTriggerProps {
	/** Unique value identifying this tab */
	value: string;
	children: ReactNode;
	/** Optional icon to display before the label */
	icon?: ReactNode;
	className?: string;
}

//
//
//

/**
 * Clickable tab button that activates the corresponding content.
 *
 * @example
 * <Tabs.Trigger value="account" icon={<UserIcon />}>
 *   Account
 * </Tabs.Trigger>
 */
const TabsTrigger = ({
	value,
	children,
	icon,
	className,
}: TabsTriggerProps) => {
	const { value: activeValue, onValueChange } = useTabsContext();

	const isActive = value === activeValue;

	return (
		<button
			type="button"
			onClick={() => onValueChange?.(value)}
			className={clsx(
				"bg-transparent box-border flex gap-gap-5 h-size-height-6 items-center justify-center min-w-[56px] px-padding-4 py-0 relative",
				{
					"border-b-[3px] border-color-primary-50 border-solid text-color-primary-50":
						isActive,
				},
				className,
			)}
		>
			<div className="flex gap-gap-5 items-center">
				{icon && <div>{icon}</div>}
				<div
					className={clsx("text-center text-nowrap", {
						"typo-heading-xsmall": isActive,
						"typo-body-medium": !isActive,
					})}
				>
					{children}
				</div>
			</div>
		</button>
	);
};

export default TabsTrigger;
