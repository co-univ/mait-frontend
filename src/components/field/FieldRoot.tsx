import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface FieldRootProps {
	disabled?: boolean;
	className?: string;
	children: ReactNode;
}

//
//
//

/**
 * Root container for a form field.
 * Groups label and input together.
 *
 * @example
 * <Field.Root>
 *   <Field.Label>Text</Field.Label>
 *   <textarea placeholder="내용을 입력하세요." />
 * </Field.Root>
 */
const FieldRoot = ({ disabled, children, className }: FieldRootProps) => {
	return (
		<div
			className={clsx(
				"flex flex-col gap-gap-5",
				{
					"text-color-gray-20": disabled,
				},
				className,
			)}
		>
			{children}
		</div>
	);
};

export default FieldRoot;
