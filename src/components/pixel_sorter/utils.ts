	export const red = (n: number) => (n >> (0 * 8)) & ((1 << 8) - 1);
	export const green = (n: number) => (n >> (1 * 8)) & ((1 << 8) - 1);
	export const blue = (n: number) => (n >> (2 * 8)) & ((1 << 8) - 1);
