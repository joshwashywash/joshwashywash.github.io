import map from "./map";
import midpoint from "@utils/math/midpoint";

const inLow = 0;
const inHigh = 255;
const outLow = -1;
const outHigh = 1;

const halfway = midpoint(inLow, inHigh);

const inputs = [inLow, halfway, inHigh];

const m = map(inLow, inHigh, outLow, outHigh);

const outputs: number[] = [];
for (const input of inputs) {
	const output = m(input);
	outputs.push(output);
}

// outputs === [-1, 0, 1]
