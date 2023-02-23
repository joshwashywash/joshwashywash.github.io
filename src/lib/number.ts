export const createClamp =
	(min: number, max: number) =>
	(n: number): number =>
		Math.min(Math.max(n, min), max);

export const randomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min) + min);
};
