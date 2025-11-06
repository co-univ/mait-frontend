import { clsx } from "clsx";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading.json";

//
//
//

interface CreationQuestionImageProps {
	imageUrl: string;
	onDelete: () => void;
}

//
//
//

const CreationQuestionImage = ({
	imageUrl,
	onDelete,
}: CreationQuestionImageProps) => {
	const imgRef = useRef<HTMLImageElement>(null);

	const [isImageLoading, setIsImageLoading] = useState(true);

	/**
	 *
	 */
	const handleImageLoad = () => {
		setIsImageLoading(false);
	};

	/**
	 *
	 */
	const handleImageError = () => {
		setIsImageLoading(false);
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when imageUrl changes, image loading state should be reset
	useEffect(() => {
		setIsImageLoading(true);
		
		// 이미지 요소가 마운트된 후 확인하기 위해 약간의 지연 추가
		// 이미지가 이미 로드된 경우(캐시에서 로드된 경우) 즉시 로딩 상태 해제
		const checkImageLoaded = () => {
			if (imgRef.current?.complete) {
				setIsImageLoading(false);
			}
		};
		
		// 즉시 확인
		checkImageLoaded();
		
		// DOM 업데이트 후 다시 확인
		const timeoutId = setTimeout(checkImageLoaded, 0);
		
		return () => {
			clearTimeout(timeoutId);
		};
	}, [imageUrl]);

	return (
		<div className="w-full flex justify-center">
			<div
				className={clsx("relative h-auto", {
					hidden: isImageLoading,
				})}
			>
				<button
					type="button"
					className="absolute top-1 right-1 z-10 bg-color-gray-20 opacity-70 text-color-gray-80 p-padding-1 rounded-full"
					onClick={onDelete}
				>
					<X size={16} />
				</button>
				<img
					ref={imgRef}
					src={imageUrl}
					alt="question-image"
					className="h-auto max-h-[400px] w-auto rounded-medium1"
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
			</div>
			{isImageLoading && (
				<Lottie
					options={{
						animationData: loadingAnimation,
					}}
					height={100}
				/>
			)}
		</div>
	);
};

export default CreationQuestionImage;
