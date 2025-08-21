import {
	Bounce,
	ToastContainer,
	type ToastOptions,
	toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import type React from "react";

//
//
//

const SHARED_COLOR_CLASSES: Record<ToastType, { text: string; bg: string }> = {
	error: { text: "text-danger-50", bg: "bg-danger-50" },
	warning: { text: "text-warning-60", bg: "bg-warning-60" },
	success: { text: "text-success-50", bg: "bg-success-50" },
	info: { text: "text-info-60", bg: "bg-info-60" },
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

type ToastType = "error" | "warning" | "success" | "info";

//
//
//

/**
 *
 */
const Toast = () => {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			transition={Bounce}
			closeButton={false} // We render it manually inside the body
			theme="light"
		/>
	);
};

/**
 *
 */
const CloseButton = ({
	closeToast,
	type,
}: {
	closeToast?: (e: React.MouseEvent<HTMLElement>) => void;
	type: ToastType;
}) => {
	const colorClass = SHARED_COLOR_CLASSES[type].text;
	return (
		<button type="button" onClick={closeToast} className="self-start p-[4px]">
			<X size={16} className={`${colorClass} hover:opacity-80`} />
		</button>
	);
};

/**
 *
 */
const toastWithMessage = (type: ToastType, message: string) => {
	const icon = ICONS[type];
	const title = TITLES[type];
	const colorClasses = SHARED_COLOR_CLASSES[type];

	const ToastBody = ({
		closeToast,
	}: {
		closeToast?: (e: React.MouseEvent<HTMLElement>) => void;
	}) => (
		<div className="flex h-full w-full items-center justify-between px-[1rem] py-[0.75rem] font-paperlogy">
			<div className="flex items-start">
				<div className="mr-padding-8 flex-shrink-0 p-[4px]">{icon}</div>
				<div className="flex flex-col gap-padding-2">
					<p className={`typo-heading-xxsmall ${colorClasses.text}`}>{title}</p>
					<p className={`typo-body-xsmall ${colorClasses.text}`}>{message}</p>
				</div>
			</div>
			<CloseButton closeToast={closeToast} type={type} />
		</div>
	);

	const options: ToastOptions = {
		icon: false,
		type: type,
		progressClassName: colorClasses.bg,
		closeButton: false,
		className: "w-[720px] h-[72px] rounded-md p-0",
	};

	toast(<ToastBody />, options);
};

//
//
//

export const notify = {
	success: (message: string) => toastWithMessage("success", message),
	error: (message: string) => toastWithMessage("error", message),
	info: (message: string) => toastWithMessage("info", message),
	warn: (message: string) => toastWithMessage("warning", message),
};

export default Toast;
