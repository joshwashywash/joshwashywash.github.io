const collatz = (n: number) => (n % 2 === 0 ? n / 2 : 3 * n + 1);

export const collatzSequence = (n: number): number[] => {
	const sequence = [n];
	while (n !== 1) {
		n = collatz(n);
		sequence.push(n);
	}
	return sequence;
};
