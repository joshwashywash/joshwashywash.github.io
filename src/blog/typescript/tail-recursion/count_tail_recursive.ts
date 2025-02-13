const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	index = 0,
	tally = 0,
): number => {
	const candidate = elements[index];

	if (candidate === undefined) return tally;

	index += 1;

	const equal = candidate === element;
	tally += +equal;

	return count_tail_recursive(elements, element, index, tally);
};
