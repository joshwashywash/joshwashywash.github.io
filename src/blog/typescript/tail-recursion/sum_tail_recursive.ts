export const sum_tail_recursive = (
	ns: number[],
	context = {
		index: 0,
		sum: 0,
	},
): number => {
	if (context.index >= ns.length) return context.sum;

	context.sum += ns[context.index];
	context.index += 1;

	return sum_tail_recursive(ns, context);
};
