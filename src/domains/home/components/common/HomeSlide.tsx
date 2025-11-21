import type React from "react";

//
//
//

interface HomeSlideProps {
	children: React.ReactNode;
}

//
//
//

const HomeSlide = ({ children }: HomeSlideProps) => {
	return <section className="h-screen snap-center">{children}</section>;
};

export default HomeSlide;
