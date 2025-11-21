import { lazy } from "react";

const Home = lazy(() => import("./pages/common/Home"));

export const homeRoutes = [
	{
		path: "/",
		element: <Home />,
	},
];
