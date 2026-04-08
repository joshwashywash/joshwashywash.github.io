type Context = {
	count: number;
	index: number;
};

export const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	context: Context = { count: 0, index: 0 },
): number => {
	if (context.index >= elements.length) return context.count;

	const equal = elements[context.index] === element;

	context.index += 1;
	context.count += +equal;

	return count_tail_recursive(elements, element, context);
};
