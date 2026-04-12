export const sum_tail_recursive = (
	ns: number[],
	context = {
		index: 0,
		sum: 0,
	},
): number => {
	if (context.index >= ns.length) return context.sum;

	const i = context.index;
	context.index += 1;

	context.sum += ns[i];

	return sum_tail_recursive(ns, context);
};
