export const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	context: { index: 0; count: 0 },
): number => {
	const candidate = elements[context.index];

	if (candidate === undefined) return context.count;

	const equal = candidate === element;

	context.index += 1;
	context.count += +equal;

	return count_tail_recursive(elements, element, context);
};
