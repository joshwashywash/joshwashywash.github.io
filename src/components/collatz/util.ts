const collatz = (n: number): number => (n % 2 === 0 ? n / 2 : 3 * n + 1);

export const collatzSequence = (n: number): number[] => {
	const sequence = [n];
	while (n !== 1) {
		n = collatz(n);
		sequence.push(n);
	}
	return sequence;
};

export const path = (
	size: number,
	forward: number,
	angle: number,
	spreadAngle: number
) => {
	const center = size / 2;
	const angles = [angle, -angle];
	let s = 0;
	return (sequence: number[]) => {
		let d = `m${center}, ${center}`;
		let a = s;
		for (let i = sequence.length - 1; i >= 0; i -= 1) {
			a += angles[sequence[i] & 1];
			d += `l${forward * Math.cos(a)}, ${forward * Math.sin(a)}`;
		}
		s += spreadAngle;
		return d;
	};
};
