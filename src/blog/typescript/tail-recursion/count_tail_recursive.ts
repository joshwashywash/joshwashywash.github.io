export const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	index = 0,
	count = 0,
): number => {
	const candidate = elements[index];

	if (candidate === undefined) return count;

	index += 1;

	const equal = candidate === element;
	count += +equal;

	return count_tail_recursive(elements, element, index, count);
};
