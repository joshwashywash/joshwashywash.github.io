import map from "./map";
import { midpoint } from "$lib/utils/math";

const a = 0;
const b = 255;
const c = -1;
const d = 1;

const halfway = midpoint(a, b);

const inputs = [a, halfway, b];

const m = map(a, b, c, d);

const outputs: number[] = [];
for (const input of inputs) {
	const output = m(input);
	outputs.push(output);
}

// outputs === [-1, 0, 1]
