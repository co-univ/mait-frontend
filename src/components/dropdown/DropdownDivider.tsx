import clsx from "clsx";

//
//
//

interface DropdownDividerProps {
	className?: string;
}

//
//
//

/**
 * Visual divider between dropdown sections.
 *
 * @example
 * <Dropdown.Content>
 *   <Dropdown.Item>Option 1</Dropdown.Item>
 *   <Dropdown.Divider />
 *   <Dropdown.Item>Option 2</Dropdown.Item>
 * </Dropdown.Content>
 */
const DropdownDivider = ({ className }: DropdownDividerProps) => {
	return (
		<div className={clsx("w-full py-padding-2 relative", className)}>
			<div className="absolute inset-0 border-t border-color-gray-20 border-solid" />
		</div>
	);
};

export default DropdownDivider;
