import type React from "react";

interface ControlLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle?: string;
}

export const ControlLayout: React.FC<ControlLayoutProps> = ({
	children,
	title,
	subtitle,
}) => {
	return (
		<div className="min-h-screen w-full p-6">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">{title}</h1>
					{subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
				</div>
				<div className="space-y-6">{children}</div>
			</div>
		</div>
	);
};
