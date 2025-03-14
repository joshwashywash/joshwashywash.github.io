export default (
	inLow: number,
	inHigh: number,
	outLow: number,
	outHigh: number,
) => {
	return (n: number) => {
		return ((n - inLow) / (inHigh - inLow)) * (outHigh - outLow) + outLow;
	};
};
