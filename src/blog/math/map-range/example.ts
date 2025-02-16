import { midpoint } from "@util/math";

const inLow = 0;
const inHigh = 255;
const outLow = -1;
const outHigh = 1;

const halfway = midpoint(inLow, inHigh);

const inputs = [inLow, halfway, inHigh];

const m = map(inLow, inHigh, outLow, outHigh);

const outputs: number[] = [];
for (const input of inputs) {
	outputs.push(m(input));
}

// outputs === [-1, 0, 1]
