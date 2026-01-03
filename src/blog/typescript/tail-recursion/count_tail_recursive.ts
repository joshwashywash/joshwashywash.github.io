type Context = {
	count: number;
	index: number;
};

export const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	{ count = 0, index = 0 }: Partial<Context> = {},
): number => {
	if (index >= elements.length) return count;

	const equal = elements[index] === element;

	index += 1;
	count += +equal;

	return count_tail_recursive(elements, element, { index, count });
};
