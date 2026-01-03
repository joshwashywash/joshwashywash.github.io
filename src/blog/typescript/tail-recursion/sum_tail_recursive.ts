type Context = {
	index: number;
	sum: number;
};

export const sum_tail_recursive = (
	ns: number[],
	{ index = 0, sum = 0 }: Partial<Context> = {},
): number => {
	if (index >= ns.length) return sum;

	index += 1;
	sum += ns[index];

	return sum_tail_recursive(ns, { index, sum });
};
