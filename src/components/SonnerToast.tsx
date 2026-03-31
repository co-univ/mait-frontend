import clsx from "clsx";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import type React from "react";
import { Toaster, toast } from "sonner";

//
//
//

type ToastType = "error" | "warning" | "success" | "info";

//
//
//

const SHARED_COLOR_CLASSES: Record<
	ToastType,
	{ text: string; border: string }
> = {
	error: { text: "text-color-danger-50", border: "border-color-danger-50" },
	warning: { text: "text-color-warning-60", border: "border-color-warning-60" },
	success: { text: "text-color-success-50", border: "border-color-success-50" },
	info: { text: "text-color-info-60", border: "border-color-info-50" },
};

const ICONS: Record<ToastType, React.ReactNode> = {
	error: <CircleAlert size={16} className={SHARED_COLOR_CLASSES.error.text} />,
	warning: (
		<TriangleAlert size={16} className={SHARED_COLOR_CLASSES.warning.text} />
	),
	success: (
		<CircleCheck size={16} className={SHARED_COLOR_CLASSES.success.text} />
	),
	info: <Info size={16} className={SHARED_COLOR_CLASSES.info.text} />,
};

const TITLES: Record<ToastType, string> = {
	error: "에러",
	warning: "경고",
	success: "성공",
	info: "정보",
};

//
//
//

interface ToastBodyProps {
	type: ToastType;
	message: string;
	onClose: () => void;
}

const ToastBody = ({ type, message, onClose }: ToastBodyProps) => {
	const colorClasses = SHARED_COLOR_CLASSES[type];
	const icon = ICONS[type];
	const title = TITLES[type];

	return (
		<div
			className={clsx(
				"bg-white border flex flex-col items-start px-padding-8 py-padding-6 rounded-radius-medium1 min-w-[450px]",
				colorClasses.border,
			)}
		>
			<div className="flex flex-col items-start w-full">
				<div className="flex items-center pb-padding-2 w-full">
					<div className="flex items-center pr-padding-8 shrink-0">{icon}</div>
					<div className="flex flex-1 items-center justify-between">
						<p
							className={clsx(
								"typo-heading-xxsmall whitespace-nowrap",
								colorClasses.text,
							)}
						>
							{title}
						</p>
						<button type="button" onClick={onClose}>
							<X
								size={16}
								className={clsx(colorClasses.text, "hover:opacity-80")}
							/>
						</button>
					</div>
				</div>
				<div className="flex items-center pl-padding-12 w-full">
					<p className={clsx("typo-body-xsmall", colorClasses.text)}>
						{message}
					</p>
				</div>
			</div>
		</div>
	);
};

//
//
//

interface NotifyOptions {
	duration?: number;
}

const showToast = (
	type: ToastType,
	message: string,
	options?: NotifyOptions,
) => {
	toast.custom(
		(t) => (
			<ToastBody
				type={type}
				message={message}
				onClose={() => toast.dismiss(t)}
			/>
		),
		{ duration: options?.duration ?? Number.POSITIVE_INFINITY },
	);
};

//
//
//

export const sonnerNotify = {
	success: (message: string, options?: NotifyOptions) =>
		showToast("success", message, options),
	error: (message: string, options?: NotifyOptions) =>
		showToast("error", message, options),
	info: (message: string, options?: NotifyOptions) =>
		showToast("info", message, options),
	warn: (message: string, options?: NotifyOptions) =>
		showToast("warning", message, options),
};

//
//
//

const SonnerToast = () => {
	return <Toaster position="bottom-right" />;
};

export default SonnerToast;
