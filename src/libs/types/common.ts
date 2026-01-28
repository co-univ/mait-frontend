export type ApiErrorResponse = Error & {
	response: Response;
	data: {
		status: string;
		code: string;
		message: string;
    reasons?: string[];
		isSuccess: boolean;
	};
	status: number;
};
