export const sum_non_tail_recursive = (ns: number[], index = 0): number => {
	const n = ns[index];

	if (n === undefined) return 0;

	index += 1;

	return n + sum_non_tail_recursive(ns, index);
};
