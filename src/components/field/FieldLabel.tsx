import type { ReactNode } from "react";

//
//
//

interface FieldLabelProps {
	children: ReactNode;
	className?: string;
	htmlFor?: string;
}

//
//
//

/**
 * Label for a form field.
 *
 * @example
 * <Field.Label htmlFor="content">Text</Field.Label>
 */
const FieldLabel = ({ children, className, htmlFor }: FieldLabelProps) => {
	return (
		<label htmlFor={htmlFor} className={className}>
			{children}
		</label>
	);
};

export default FieldLabel;
