declare class Float32BufferAttribute {
	constructor(array: number[], itemSize: number, normalized?: boolean);
}

declare class BufferGeometry {
	setAttribute(name: string, attribute: Float32BufferAttribute): this;
	setIndex(index: number[]): this;
}

class RoundedPlaneGeometry extends BufferGeometry {
	constructor({
		corner_radius = 1,
		inner_width = 0,
		inner_height = 0,
		point_count = 32,
	} = {}) {
		super();

		const index: number[] = [];
		const uv: number[] = [0.5, 0.5];
		const position: number[] = [0, 0, 0];
		const normal: number[] = [0, 0, 1];

		const segment = (2 * Math.PI) / point_count;

		const half_inner_width = 0.5 * inner_width;
		const half_inner_height = 0.5 * inner_height;

		for (let i = 0; i <= point_count; i += 1) {
			const amount = segment * (i + 1);

			const c = Math.cos(amount);
			const s = Math.sin(amount);

			const uvx = 0.5 * (1 + c);
			const uvy = 0.5 * (1 + s);
			uv.push(uvx, uvy);

			let x = corner_radius * c;
			x += Math.sign(x) * half_inner_width;

			let y = corner_radius * s;
			y += Math.sign(y) * half_inner_height;

			position.push(x, y, 0);

			normal.push(0, 0, 1);
			index.push(i, i + 1, 0);
		}

		this.setAttribute("position", new Float32BufferAttribute(position, 3));
		this.setAttribute("normal", new Float32BufferAttribute(normal, 3));
		this.setAttribute("uv", new Float32BufferAttribute(uv, 2));
		this.setIndex(index);
	}
}
