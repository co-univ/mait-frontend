import { createContext } from 'react';

export interface SwitchContextValue {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const SwitchContext = createContext<SwitchContextValue | null>(null);
