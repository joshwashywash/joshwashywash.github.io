export const count_non_tail_recursive = <E>(
	elements: E[],
	element: E,
	index = 0,
): number => {
	const candidate = elements[index];

	if (candidate === undefined) return 0;

	const equal = candidate === element;

	index += 1;

	return +equal + count_non_tail_recursive(elements, element, index);
};
