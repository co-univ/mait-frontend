import { lazy } from "react";

const Home = lazy(() => import("./pages/common/Home"));

export const homeRouter = [
	{
		path: "/",
		element: <Home />,
	},
];
