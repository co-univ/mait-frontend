import React from "react";

//
//
//

interface SolvingQuizImageProps {
	src: string;
}

//
//
//

const SolvingQuizImage = ({ src }: SolvingQuizImageProps) => {
	return (
		<div className="w-full max-w-full h-[400px] max-h-[400px] mt-5 rounded-medium1 flex items-center justify-center">
			<img
				src={src}
				alt="quiz-image"
				className="max-w-full max-h-full object-contain rounded-medium1"
			/>
		</div>
	);
};

export default SolvingQuizImage;
