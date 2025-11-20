export const sum_non_tail_recursive = (
	ns: number[],
	context = { index: 0 },
): number => {
	const n = ns[context.index];

	if (n === undefined) return 0;

	context.index += 1;

	return n + sum_non_tail_recursive(ns, context);
};
