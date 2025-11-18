import { RadioGroup } from './RadioGroup';
import { RadioInput } from './RadioInput';
import { RadioItem } from './RadioItem';
import { RadioLabel } from './RadioLabel';

/**
 * Radio component with compound component pattern
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { useState } from 'react';
 * import { Radio } from '@/components/radio';
 *
 * function MyForm() {
 *   const [selected, setSelected] = useState('ai');
 *
 *   return (
 *     <Radio.Group value={selected} onChange={setSelected}>
 *       <Radio.Item value="ai">
 *         <Radio.Input />
 *         <Radio.Label>AI 생성</Radio.Label>
 *       </Radio.Item>
 *       <Radio.Item value="manual">
 *         <Radio.Input />
 *         <Radio.Label>직접 제작</Radio.Label>
 *       </Radio.Item>
 *     </Radio.Group>
 *   );
 * }
 * ```
 *
 * @example
 * With custom layout:
 * ```tsx
 * <Radio.Group value={value} onChange={setValue} className="flex gap-4">
 *   <Radio.Item value="option1" className="flex-1 p-4 border rounded">
 *     <Radio.Input />
 *     <Radio.Label>Option 1</Radio.Label>
 *   </Radio.Item>
 *   <Radio.Item value="option2" className="flex-1 p-4 border rounded">
 *     <Radio.Input />
 *     <Radio.Label>Option 2</Radio.Label>
 *   </Radio.Item>
 * </Radio.Group>
 * ```
 *
 * @example
 * Disabled state:
 * ```tsx
 * <Radio.Group value={value} onChange={setValue} disabled>
 *   <Radio.Item value="option1">
 *     <Radio.Input />
 *     <Radio.Label>Disabled Option</Radio.Label>
 *   </Radio.Item>
 * </Radio.Group>
 * ```
 *
 * @example
 * With complex label content:
 * ```tsx
 * <Radio.Group value={value} onChange={setValue}>
 *   <Radio.Item value="premium">
 *     <Radio.Input />
 *     <Radio.Label>
 *       <div>
 *         <div className="font-bold">Premium Plan</div>
 *         <div className="text-sm text-gray-500">$29/month</div>
 *       </div>
 *     </Radio.Label>
 *   </Radio.Item>
 *   <Radio.Item value="basic">
 *     <Radio.Input />
 *     <Radio.Label>
 *       <div>
 *         <div className="font-bold">Basic Plan</div>
 *         <div className="text-sm text-gray-500">Free</div>
 *       </div>
 *     </Radio.Label>
 *   </Radio.Item>
 * </Radio.Group>
 * ```
 *
 * @example
 * Uncontrolled usage:
 * ```tsx
 * function MyForm() {
 *   const handleChange = (value: string) => {
 *     console.log('Selected:', value);
 *   };
 *
 *   return (
 *     <Radio.Group onChange={handleChange}>
 *       <Radio.Item value="option1">
 *         <Radio.Input />
 *         <Radio.Label>Option 1</Radio.Label>
 *       </Radio.Item>
 *       <Radio.Item value="option2">
 *         <Radio.Input />
 *         <Radio.Label>Option 2</Radio.Label>
 *       </Radio.Item>
 *     </Radio.Group>
 *   );
 * }
 * ```
 */
export const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
  Input: RadioInput,
  Label: RadioLabel,
};
