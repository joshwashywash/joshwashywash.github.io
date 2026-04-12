export const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	context = {
		count: 0,
		index: 0,
	},
): number => {
	if (context.index >= elements.length) return context.count;

	const equal = elements[context.index] === element;
	context.count += +equal;

	context.index += 1;

	return count_tail_recursive(elements, element, context);
};
