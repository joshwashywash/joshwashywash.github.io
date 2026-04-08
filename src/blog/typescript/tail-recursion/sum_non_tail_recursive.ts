type Context = {
	index: number;
};

export const sum_non_tail_recursive = (
	ns: number[],
	context: Context = { index: 0 },
): number => {
	if (context.index >= ns.length) return 0;
	context.index += 1;

	return ns[context.index] + sum_non_tail_recursive(ns, context);
};
