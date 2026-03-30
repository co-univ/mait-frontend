import clsx from "clsx";
import { PencilLine } from "lucide-react";
import useBreakpoint from "@/hooks/useBreakpoint";

//
//
//

interface SolvingHeaderProps {
	title: string;
	questionNum: number;
	totalQuestionNum: number;
}

//
//
//

const SolvingLiveTopBar = ({
	title,
	questionNum,
	totalQuestionNum,
}: SolvingHeaderProps) => {
	const { isMobile } = useBreakpoint();

	return (
		<div
			className={clsx("w-full flex flex-col justify-between", {
				"h-size-height-11": !isMobile,
				"h-size-height-10": isMobile,
			})}
		>
			<div className="flex gap-gap-5 items-center">
				<PencilLine className="text-alpha-black100" />
				<span
					className={clsx("text-alpha-black100", {
						"typo-heading-medium": !isMobile,
						"typo-heading-small": isMobile,
					})}
				>
					{title}
				</span>
			</div>
			<div className="w-full h-[10px] rounded-radius-max bg-gray-5 relative">
				<div
					className={clsx("absolute inset-0 bg-primary-50 rounded-max", {
						"h-[10px]": !isMobile,
						"h-[5px]": isMobile,
					})}
					style={{
						width: `${(100 / totalQuestionNum) * questionNum}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default SolvingLiveTopBar;
