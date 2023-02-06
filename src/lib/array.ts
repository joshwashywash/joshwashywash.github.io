export const aperture = <T>(n: number, ts: T[]) => {
	if (n < 1 || n > ts.length) return [];
	const length = ts.length - n + 1;
	return Array.from({ length }, (_, i) => ts.slice(i, i + n));
};
