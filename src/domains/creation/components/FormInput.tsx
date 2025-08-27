//
//
//

/**
 * FormInput 컴포넌트 - 일반적인 입력 필드를 위한 재사용 가능한 컴포넌트
 * 텍스트 입력과 텍스트 영역(textarea) 모두 지원
 */
interface FormInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	multiline?: boolean;
	className?: string;
}

//
//
//

/**
 * FormInput 컴포넌트
 * @param label - 입력 필드의 라벨 텍스트
 * @param value - 현재 입력 값
 * @param onChange - 값 변경 시 호출되는 콜뱡 함수
 * @param placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param required - 필수 입력 필드 여부 (기본값: false)
 * @param multiline - 다중 행 입력(textarea) 사용 여부 (기본값: false)
 * @param className - 추가 CSS 클래스명
 */
const FormInput = ({
	label,
	value,
	onChange,
	placeholder,
	required = false,
	multiline = false,
	className = "",
}: FormInputProps) => {
	const baseClasses =
		"w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

	// 고유 ID 생성을 위한 간단한 방법
	const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className={`flex flex-col gap-2 ${className}`.trim()}>
			<label htmlFor={inputId} className="text-sm font-medium text-gray-700">
				{label}
				{required && <span className="ml-1 text-red-500">*</span>}
			</label>
			{multiline ? (
				<textarea
					id={inputId}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={`${baseClasses} min-h-[100px] resize-y`}
					required={required}
				/>
			) : (
				<input
					id={inputId}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={baseClasses}
					required={required}
				/>
			)}
		</div>
	);
};

export default FormInput;
