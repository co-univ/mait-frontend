import { createContext } from 'react';

export interface RadioContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

export const RadioContext = createContext<RadioContextValue | null>(null);
