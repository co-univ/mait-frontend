import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface FieldRootProps {
	children: ReactNode;
	className?: string;
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
const FieldRoot = ({ children, className }: FieldRootProps) => {
	return (
		<div className={clsx("flex flex-col gap-gap-5", className)}>{children}</div>
	);
};

export default FieldRoot;
