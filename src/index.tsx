import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/App.routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			retryDelay: 1000,
			staleTime: 5 * 60 * 1000,
		},
		mutations: {
			retry: 0,
		},
	},
});

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
