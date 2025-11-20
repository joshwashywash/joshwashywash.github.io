export const sum_tail_recursive = (
	ns: number[],
	context: { index: 0; sum: 0 },
): number => {
	const n = ns[context.index];

	if (n === undefined) return context.sum;

	context.index += 1;
	context.sum += n;

	return sum_tail_recursive(ns, context);
};
