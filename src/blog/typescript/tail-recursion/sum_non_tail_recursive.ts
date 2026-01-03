type Context = {
	index: number;
};

export const sum_non_tail_recursive = (
	ns: number[],
	{ index = 0 }: Partial<Context> = {},
): number => {
	if (index >= ns.length) return 0;
	index += 1;

	return ns[index] + sum_non_tail_recursive(ns, { index });
};
