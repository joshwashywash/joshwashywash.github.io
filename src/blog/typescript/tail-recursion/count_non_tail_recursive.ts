type Context = {
	index: number;
};

export const count_non_tail_recursive = <E>(
	elements: E[],
	element: E,
	{ index = 0 }: Partial<Context> = {},
): number => {
	if (index >= elements.length) return 0;

	const equal = elements[index] === element;

	index += 1;

	return +equal + count_non_tail_recursive(elements, element, { index });
};
