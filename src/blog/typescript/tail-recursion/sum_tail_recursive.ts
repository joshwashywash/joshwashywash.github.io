type Context = {
	index: number;
	sum: number;
};

export const sum_tail_recursive = (
	ns: number[],
	context: Context = { index: 0, sum: 0 },
): number => {
	if (context.index >= ns.length) return context.sum;

	context.index += 1;
	context.sum += ns[context.index];

	return sum_tail_recursive(ns, context);
};
