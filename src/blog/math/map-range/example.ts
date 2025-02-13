const inLow = 0;
const inHigh = 255;
const outLow = -1;
const outHigh = 1;

const midpoint = (a: number, b: number): number => {
	return 0.5 * (a + b);
};

const halfway = midpoint(inLow, inHigh);

const inputs = [inLow, halfway, inHigh];

const m = map(inLow, inHigh, outLow, outHigh);

const outputs: number[] = [];
for (const input of inputs) {
	outputs.push(m(input));
}

console.log(outputs); // [-1, 0, 1]
