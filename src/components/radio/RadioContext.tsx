import { createContext } from "react";

export interface RadioContextValue<T = string> {
	value?: T;
	onChange?: (value: T) => void;
	name?: string;
	disabled?: boolean;
}

export const RadioContext = createContext<RadioContextValue<unknown> | null>(
	null,
);
