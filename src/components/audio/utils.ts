import type { Action } from 'svelte/action';

export const visualizer: Action<
	HTMLCanvasElement,
	{
		audio: HTMLAudioElement;
		borderWidth: number;
		fftSize: number;
		fillColor: string;
		strokeColor: string;
	}
> = (canvas, options) => {
	const canvasContext = canvas.getContext('2d');
	if (canvasContext) {
		const { audio, borderWidth, fftSize, fillColor, strokeColor } = options;

		const audioContext = new AudioContext();
		const source = audioContext.createMediaElementSource(audio);
		const analyser = audioContext.createAnalyser();
		analyser.fftSize = fftSize;

		source.connect(analyser);
		analyser.connect(audioContext.destination);

		const l = analyser.frequencyBinCount;
		const data = new Uint8Array(l);

		canvasContext.fillStyle = fillColor;
		canvasContext.strokeStyle = strokeColor;
		canvasContext.strokeRect(0, 0, canvas?.width, canvas?.height);
		const innerWidth = canvas.width - 2 * borderWidth;
		const halfWidth = innerWidth * 0.5;
		const sx = halfWidth + borderWidth;
		const innerHeight = canvas.height - 2 * borderWidth;
		const w = innerWidth / l;

		let frame: number | undefined = undefined;

		const animate = () => {
			analyser.getByteFrequencyData(data);
			canvasContext.clearRect(borderWidth, borderWidth, innerWidth, innerHeight);
			for (let i = 0; i < l; i += 1) {
				const h = (data[i] / 255) * innerHeight;
				const y = borderWidth + innerHeight - h;
				const o = i * w;
				canvasContext.fillRect(sx + o, y, w, h);
				canvasContext.fillRect(sx - o, y, w, h);
			}
			frame = requestAnimationFrame(animate);
		};

		const cancelAnimation = () => {
			if (frame !== undefined) {
				cancelAnimationFrame(frame);
			}
			frame = undefined;
		};

		audio.addEventListener('play', animate);
		audio.addEventListener('pause', cancelAnimation);
		audio.addEventListener('ended', cancelAnimation);

		return {
			destroy() {
				audio.removeEventListener('play', animate);
				audio.removeEventListener('pause', cancelAnimation);
				audio.removeEventListener('ended', cancelAnimation);
			},
		};
	}
};
