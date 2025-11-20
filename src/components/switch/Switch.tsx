import { SwitchLabel } from "./SwitchLabel";
import { SwitchRoot } from "./SwitchRoot";
import { SwitchToggle } from "./SwitchToggle";

/**
 * Switch component with compound component pattern
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { useState } from 'react';
 * import { Switch } from '@/components/switch';
 *
 * function MyForm() {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <Switch.Root checked={checked} onChange={setChecked}>
 *       <Switch.Toggle />
 *     </Switch.Root>
 *   );
 * }
 * ```
 *
 * @example
 * With label:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Label>문제 공개</Switch.Label>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * Disabled state:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked} disabled>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Switch.Root
 *   checked={checked}
 *   onChange={setChecked}
 *   className="p-2"
 * >
 *   <Switch.Label className="text-primary-50">Custom</Switch.Label>
 *   <Switch.Toggle className="w-12 h-7" />
 * </Switch.Root>
 * ```
 */
export const Switch = {
	Root: SwitchRoot,
	Toggle: SwitchToggle,
	Label: SwitchLabel,
};
