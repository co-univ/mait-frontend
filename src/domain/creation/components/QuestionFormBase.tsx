//
//
//

/**
 * QuestionFormBase 컴포넌트 - 모든 문제 유형에서 공통으로 사용되는 기본 래퍼 컴포넌트
 * 문제 유형별 폼에서 사용되는 공통 레이아웃과 스타일을 제공
 */
interface QuestionFormBaseProps {
	children: React.ReactNode;
	title: string;
	questionNumber?: number;
	questionType?: string;
	className?: string;
	disabled?: boolean;
}

//
//
//

/**
 * QuestionFormBase 컴포넌트
 * @param children - 문제 유형별 폼 컴포넌트
 * @param title - 문제 유형 제목
 * @param questionNumber - 문제 번호
 * @param questionType - 문제 유형 (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
 * @param className - 추가 CSS 클래스명
 */
const QuestionFormBase = ({
	children,
	title,
	questionNumber,
	questionType,
	className = "",
	disabled = false,
}: QuestionFormBaseProps) => {
	// 문제 유형별 색상 매핑
	const getTypeColor = (type?: string) => {
		switch (type) {
			case "MULTIPLE":
				return "bg-purple-100 text-purple-700 border-purple-200";
			case "SHORT":
				return "bg-green-100 text-green-700 border-green-200";
			case "ORDERING":
				return "bg-orange-100 text-orange-700 border-orange-200";
			case "FILL_BLANK":
				return "bg-yellow-100 text-yellow-700 border-yellow-200";
			default:
				return "bg-blue-100 text-blue-700 border-blue-200";
		}
	};

	// 문제 유형 한글 매핑
	const getTypeLabel = (type?: string) => {
		switch (type) {
			case "MULTIPLE":
				return "객관식";
			case "SHORT":
				return "주관식";
			case "ORDERING":
				return "순서배치";
			case "FILL_BLANK":
				return "빈칸 문제";
			default:
				return "문제";
		}
	};
	return (
		<div
			className={`w-full rounded-lg border border-gray-100 bg-white p-6 shadow-sm ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`.trim()}
		>
			{/* 문제 헤더 - 번호와 유형 표시 */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					{questionNumber && (
						<span
							className={`flex h-8 w-8 items-center justify-center ${disabled ? "bg-gray-400" : "bg-blue-600"} rounded-full text-sm font-bold text-white`}
						>
							{questionNumber}
						</span>
					)}
					<h3
						className={`text-lg font-semibold ${disabled ? "text-gray-500" : "text-gray-800"}`}
					>
						{title}
					</h3>
					{questionType && (
						<span
							className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeColor(questionType)}`}
						>
							{getTypeLabel(questionType)}
						</span>
					)}
					{disabled && (
						<span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
							저장됨 (수정 불가)
						</span>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default QuestionFormBase;
