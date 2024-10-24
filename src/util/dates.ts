const createFormat = (formatOptions: Intl.DateTimeFormatOptions) => {
	return (date: Date) => {
		return date.toLocaleDateString("en-US", formatOptions);
	};
};

export const format = createFormat({
	day: "numeric",
	month: "long",
	year: "numeric",
});
