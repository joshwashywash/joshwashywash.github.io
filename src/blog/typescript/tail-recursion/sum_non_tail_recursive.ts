export const sum_non_tail_recursive = (
	ns: number[],
	context = {
		index: 0,
	},
): number => {
	if (context.index >= ns.length) return 0;

	const i = context.index;
	context.index += 1;

	return ns[i] + sum_non_tail_recursive(ns, context);
};
