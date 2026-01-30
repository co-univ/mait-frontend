import type React from "react";

//
//
//

interface HomeSlideProps {
	id: string;
	children: React.ReactNode;
}

//
//
//

const HomeSlide = ({ id, children }: HomeSlideProps) => {
	return (
		<section id={id} className="h-screen snap-center">
			{children}
		</section>
	);
};

export default HomeSlide;
