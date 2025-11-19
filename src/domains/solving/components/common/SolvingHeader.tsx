import { PencilLine } from "lucide-react";

//
//
//

interface SolvingHeaderProps {
	title: string;
	questionNum: number;
	questionCount: number;
}

//
//
//

const SolvingHeader = ({
	title,
	questionNum,
	questionCount,
}: SolvingHeaderProps) => {
	return (
		<div className="w-full h-size-height-11 flex flex-col justify-between">
			<div className="flex gap-gap-5 items-center">
				<PencilLine className="text-alpha-black100" />
				<span className="typo-heading-medium text-alpha-black100">{title}</span>
			</div>
			<div className="w-full h-[10px] rounded-radius-max bg-gray-5 relative">
				<div
					className="absolute h-[10px] inset-0 bg-primary-50 rounded-max"
					style={{
						width: `${(100 / questionCount) * questionNum}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default SolvingHeader;
