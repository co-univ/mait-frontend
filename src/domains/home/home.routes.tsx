import { lazy } from "react";

const Home = lazy(() => import("./pages/common/Home"));

//
//
//

/**
 * @property {string} ROOT `/`
 */
export const HOME_ROUTE_PATH = {
	ROOT: "/",
};

//
//
//

export const homeRouter = [
	{
		path: HOME_ROUTE_PATH.ROOT,
		element: <Home />,
	},
];
