export const count_non_tail_recursive = <E>(
	elements: E[],
	element: E,
	context = {
		index: 0,
	},
): number => {
	if (context.index >= elements.length) return 0;

	const equal = elements[context.index] === element;

	context.index += 1;

	return +equal + count_non_tail_recursive(elements, element, context);
};
