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
	const ref = useRef<HTMLImageElement>(null);

	const [isImageLoading, setIsImageLoading] = useState(true);

	/**
	 *
	 */
	const handleImageLoad = () => {
		setIsImageLoading(false);
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: when imageUrl changes, image loading state should be reset
	useEffect(() => {
		if (!ref.current?.complete) {
			setIsImageLoading(true);
		}
	}, [imageUrl]);

	return (
		<div className="w-full flex justify-center">
			<div
				ref={ref}
				className={clsx("relative h-auto", {
					hidden: isImageLoading,
				})}
				onLoad={handleImageLoad}
			>
				<button
					type="button"
					className="absolute top-1 right-1 z-10 bg-color-gray-20 opacity-70 text-color-gray-80 p-padding-1 rounded-full"
					onClick={onDelete}
				>
					<X size={16} />
				</button>
				<img
					src={imageUrl}
					alt="question-image"
					className="h-auto max-h-[400px] w-auto rounded-medium1"
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
