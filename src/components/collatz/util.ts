import type { Action } from 'svelte/action';

const collatz = (n: number) => (n % 2 === 0 ? n / 2 : 3 * n + 1);

export const collatzSequence = (n: number): number[] => {
	const sequence = [n];
	while (n !== 1) {
		n = collatz(n);
		sequence.push(n);
	}
	return sequence;
};

/**
 * sequence has the shape [1, ..., n] where n is the starting number of the sequence
 */
export const turtle: Action<
	HTMLCanvasElement,
	{
		amount: number;
		angle: number;
		color: (index?: number) => string;
		sequences: number[][];
		size: number;
		thickness: number;
	}
> = (
	canvas,
	options = {
		amount: 5,
		angle: Math.PI / 6,
		color() {
			return 'black';
		},
		sequences: [],
		size: 300,
		thickness: 5,
	}
) => {
	const context = canvas.getContext('2d');
	if (context) {
		canvas.width = options.size;
		canvas.height = options.size;
		context.lineWidth = options.thickness;
		context.lineCap = 'round';
		context.lineJoin = 'round';
		let i = 0;
		for (const sequence of options.sequences) {
			context.strokeStyle = options.color(i);
			context.translate(canvas.width / 2, canvas.height / 2);
			context.beginPath();
			context.moveTo(0, 0);
			for (const n of sequence) {
				n % 2 === 0
					? context.rotate(options.angle)
					: context.rotate(-options.angle);
				context.lineTo(options.amount, 0);
				context.translate(options.amount, 0);
			}
			context.stroke();
			context.resetTransform();
			i += 1;
		}
	}
};
