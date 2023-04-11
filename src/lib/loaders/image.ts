export default (path: string) => {
	return new Promise<HTMLImageElement>((resolve) => {
		const image = new Image();
		image.addEventListener(
			'load',
			() => {
				resolve(image);
			},
			{ once: true }
		);
		image.src = path;
	});
};
