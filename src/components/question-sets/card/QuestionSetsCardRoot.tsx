import clsx from "clsx";
import React from "react";
import type { JSX } from "react/jsx-runtime";

//
//
//

interface QuestionSetsCardRootProps<
	T extends keyof JSX.IntrinsicElements = "div",
> {
	children: React.ReactNode;
	className?: string;
	as?: T;
}

type QuestionSetsCardRootPropsWithElement<
	T extends keyof JSX.IntrinsicElements,
> = QuestionSetsCardRootProps<T> &
	Omit<JSX.IntrinsicElements[T], keyof QuestionSetsCardRootProps<T>>;

//
//
//

const QuestionSetsCardRoot = <T extends keyof JSX.IntrinsicElements = "div">({
	children,
	className,
	as,
	...rest
}: QuestionSetsCardRootPropsWithElement<T>) => {
	const Component = as || "div";

	return React.createElement(
		Component,
		{
			...rest,
			className: clsx(
				"flex flex-col gap-gap-10 p-padding-11 border border-color-gray-10 rounded-medium1 bg-color-alpha-white100",
				className,
			),
		},
		children,
	);
};

export default QuestionSetsCardRoot;
