import { Control, Participants } from "./pages";

export const controlRoutes = [
	{
		path: "/control",
		element: <Control />,
	},
	{
		path: "/control/:questionSetId/participants",
		element: <Participants />,
	},
];
