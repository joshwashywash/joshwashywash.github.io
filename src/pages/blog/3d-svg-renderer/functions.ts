export const rotate = <T>(ts: T[]): T[] => {
	const copy = [...ts];
	const last = copy.pop();
	if (last !== undefined) {
		copy.unshift(last);
	}
	return copy;
};
