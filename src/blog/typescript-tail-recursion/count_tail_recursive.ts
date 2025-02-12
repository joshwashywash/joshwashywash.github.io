const count_tail_recursive = <E>(
	elements: E[],
	element: E,
	index = 0,
	tally = 0,
): number => {
	const candidate = elements[index];
	if (candidate === undefined) return tally;
	const equal = candidate === element;
	return count_tail_recursive(elements, element, index + 1, +equal + tally);
};
