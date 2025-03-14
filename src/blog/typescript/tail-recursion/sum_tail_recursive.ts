export const sum_tail_recursive = (
	ns: number[],
	index = 0,
	total = 0,
): number => {
	const n = ns[index];

	if (n === undefined) return total;

	index += 1;
	total += n;

	return sum_tail_recursive(ns, index, total);
};
