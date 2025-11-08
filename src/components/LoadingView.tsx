import { Spinner } from "./shadcn-ui/spinner";

//
//
//

const LoadingView = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<Spinner className="size-8 text-primary-50" />
			<p className="text-gray-600">Processing...</p>
		</div>
	);
};

export default LoadingView;
