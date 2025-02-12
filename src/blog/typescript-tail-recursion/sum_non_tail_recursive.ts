const non_tail_recursive_sum = (ns: number[], index = 0): number => {
	const n = ns[index];
	if (n === undefined) return 0;
	return n + non_tail_recursive_sum(ns, index + 1);
};
