/**
 * linearly maps a number from the input range [a, b] to the output range [c, d]
 */
export default (a: number, b: number, c: number, d: number) => {
	return (n: number): number => {
		return ((n - a) / (b - a)) * (d - c) + c;
	};
};
