import QuizSolvingHome from "./QuizSolvingHome";
import QuizSolvingRealTimeSolving from "./real-time/QuizSolvingRealTimeSolving";

export const solvingRoutes = [
	{
		path: "/quiz-solving",
		element: <QuizSolvingHome />,
	},
	{
		path: "/quiz-solving/:id",
		element: <QuizSolvingRealTimeSolving />,
	},
];
