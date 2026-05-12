import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { QuestionSetCategoryApiResponse } from "@/libs/types";
import CreationCategoryBadge from "./CreationCategoryBadge";

//
//
//

interface CreationCategoryTriggerProps {
	isOpen: boolean;
	selectedCategories: QuestionSetCategoryApiResponse[];
	onToggle: () => void;
	onCategoryRemove: (categoryId: number) => void;
}

// fixed width of the overflow badge in px
const OVERFLOW_BADGE_WIDTH = 32;
// pixel value of gap-gap-3
const GAP = 6;

//
//
//

const CreationCategoryTrigger = ({
	isOpen,
	selectedCategories,
	onToggle,
	onCategoryRemove,
}: CreationCategoryTriggerProps) => {
	const hasCategories = selectedCategories.length > 0;

	// observe the button element so badge visibility changes do not affect the measured width
	const buttonRef = useRef<HTMLButtonElement>(null);
	const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
	// cache badge widths — no remeasure needed until selectedCategories changes
	const badgeWidthsRef = useRef<number[]>([]);
	const [visibleCount, setVisibleCount] = useState(selectedCategories.length);

	const calculate = useCallback(
		(containerWidth: number) => {
			const widths = badgeWidthsRef.current;
			let usedWidth = 0;
			let count = 0;

			for (let i = 0; i < selectedCategories.length; i++) {
				const badgeWidth = widths[i] ?? 0;

				if (badgeWidth === 0) {
					break;
				}

				const widthWithGap = i === 0 ? badgeWidth : GAP + badgeWidth;
				const isLast = i === selectedCategories.length - 1;
				const required = isLast
					? usedWidth + widthWithGap
					: usedWidth + widthWithGap + GAP + OVERFLOW_BADGE_WIDTH;

				if (required <= containerWidth) {
					usedWidth += widthWithGap;
					count = i + 1;
				} else {
					break;
				}
			}

			setVisibleCount(count);
		},
		[selectedCategories],
	);

	// remeasure badge widths and recalculate when selectedCategories changes
	useEffect(() => {
		if (!hasCategories) return;

		const rafId = requestAnimationFrame(() => {
			badgeWidthsRef.current = badgeRefs.current
				.slice(0, selectedCategories.length)
				.map((el) => el?.offsetWidth ?? 0);

			const button = buttonRef.current;

			if (!button) {
				return;
			}

			const chevron = button.querySelector<HTMLElement>("[data-chevron]");
			const chevronWidth = chevron ? chevron.offsetWidth + GAP : 24 + GAP;

			calculate(button.clientWidth - chevronWidth);
		});

		return () => cancelAnimationFrame(rafId);
	}, [hasCategories, selectedCategories, calculate]);

	// recalculate on button width change, reusing the cached badge widths
	useEffect(() => {
		if (!hasCategories) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const button = entry.target as HTMLButtonElement;
				const chevron = button.querySelector<HTMLElement>("[data-chevron]");
				const chevronWidth = chevron ? chevron.offsetWidth + GAP : 24 + GAP;
				calculate(entry.contentRect.width - chevronWidth);
			}
		});

		if (buttonRef.current) {
			observer.observe(buttonRef.current);
		}

		return () => observer.disconnect();
	}, [hasCategories, calculate]);

	const hiddenCount = selectedCategories.length - visibleCount;

	return (
		<button
			ref={buttonRef}
			type="button"
			onClick={onToggle}
			className="w-full bg-color-gray-5 rounded-radius-medium1 px-padding-11 py-padding-10"
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-gap-3 flex-1 min-w-0 overflow-hidden">
					{!hasCategories ? (
						<span className="typo-body-medium text-color-gray-95">
							카테고리 추가
						</span>
					) : (
						<>
							{selectedCategories.map((category, i) => (
								<span
									key={category.id}
									ref={(el) => {
										badgeRefs.current[i] = el;
									}}
									className={
										i >= visibleCount ? "invisible absolute" : "flex-shrink-0"
									}
								>
									<CreationCategoryBadge
										category={category}
										onRemove={onCategoryRemove}
									/>
								</span>
							))}
							{hiddenCount > 0 && (
								<span className="flex-shrink-0 flex items-center bg-color-primary-10 px-padding-5 py-padding-2 rounded-radius-medium1 typo-body-xsmall text-color-gray-95">
									+{hiddenCount}
								</span>
							)}
						</>
					)}
				</div>
				<span data-chevron className="flex-shrink-0 text-color-gray-95">
					{!hasCategories && <Plus />}
					{hasCategories && !isOpen && <ChevronDown />}
					{hasCategories && isOpen && <ChevronUp />}
				</span>
			</div>
		</button>
	);
};

export default CreationCategoryTrigger;
