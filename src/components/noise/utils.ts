import type { Action } from 'svelte/action';

export type Mulberry = () => number;

export const createMulberry = (seed = 0): Mulberry => {
	return () => {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

type Options = {
	height: number;
	mulberry: Mulberry;
	width: number;
};

export const random: Action<HTMLCanvasElement, Options> = (
	canvas,
	options = { mulberry: createMulberry(), width: 300, height: 300 }
) => {
	canvas.width = options.width;
	canvas.height = options.height;
	const context = canvas.getContext('2d');
	if (context !== null) {
		const data = context.createImageData(canvas.width, canvas.height);
		for (let y = 0; y < canvas.height; y += 1) {
			for (let x = 0; x < canvas.width; x += 1) {
				const v = options.mulberry() * 255;
				const index = 4 * (x + y * canvas.width);
				data.data[index] = v;
				data.data[1 + index] = v;
				data.data[2 + index] = v;
				data.data[3 + index] = 255;
			}
		}
		context.putImageData(data, 0, 0);
	}
};

export const vectors: Action<HTMLCanvasElement, Options & { scale: number; lines: number }> = (
	canvas,
	options = {
		height: 512,
		lines: 3,
		mulberry: createMulberry(),
		scale: 0.75,
		width: 512,
	}
) => {
	canvas.width = options.width;
	canvas.height = options.height;
	const context = canvas.getContext('2d');
	if (context !== null) {
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.strokeStyle = 'black';
		context.fillStyle = 'black';
		context.lineWidth = options.width * (1 / 128);
		context.lineCap = 'round';

		const scaledWidth = options.scale * options.width;
		const scaledHeight = options.scale * options.height;

		const cw = Math.floor(scaledWidth / (options.lines + 1));
		const ch = Math.floor(scaledHeight / (options.lines + 1));

		const offsetY = canvas.height / 2 - scaledHeight / 2;
		const offsetX = canvas.width / 2 - scaledWidth / 2;

		const lineScalar = canvas.width * 0.1;
		const radiusSize = canvas.width * (1 / 64);

		for (let y = 0; y < options.lines + 2; y += 1) {
			const py = y * ch + offsetY;
			for (let x = 0; x < options.lines + 2; x += 1) {
				const px = x * cw + offsetX;

				const v = options.mulberry() * 2 * Math.PI;

				context.beginPath();
				context.ellipse(px, py, radiusSize, radiusSize, 0, 0, 2 * Math.PI);
				context.fill();
				context.moveTo(px, py);
				context.lineTo(px + lineScalar * Math.cos(v), py + lineScalar * Math.sin(v));
				context.stroke();
			}
		}
	}
};

const grad = (hash: number, x: number, y: number, z = 0) => {
	const h = hash & 15;
	const u = h < 8 ? x : y;
	const v = h < 4 ? y : [12, 14].includes(h) ? x : z;
	return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};

const lerp = (a: number, b: number) => (t: number) => a + t * (b - a);

const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);

export const perlin = () => {
	const p = [
		151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
		142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
		203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
		74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
		220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
		132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
		3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59,
		227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70,
		221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178,
		185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81,
		51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115,
		121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195,
		78, 66, 215, 61, 156, 180,
	];
	return (x: number, y: number): number => {
		const X = Math.floor(x) & 255;
		const Y = Math.floor(y) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);

		const u = fade(x);
		const v = fade(y);

		const A = p[X % p.length] + Y;
		const AA = p[A % p.length];
		const AB = p[(A + 1) % p.length];

		const B = p[(X + 1) % p.length] + Y;
		const BA = p[B % p.length];
		const BB = p[(B + 1) % p.length];

		return lerp(
			lerp(grad(p[AA % p.length], x, y), grad(p[BA % p.length], x - 1, y))(u),
			lerp(grad(p[AB % p.length], x, y - 1), grad(p[BB % p.length], x - 1, y - 1))(u)
		)(v);
	};
};
