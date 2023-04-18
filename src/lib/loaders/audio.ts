export default (path: string) => {
	return new Promise<HTMLAudioElement>((resolve) => {
		const audio = new Audio();
		audio.addEventListener(
			'canplaythrough',
			() => {
				resolve(audio);
			},
			{ once: true }
		);
		audio.src = path;
	});
};
