export const createIgnoreTab = (f: () => void) => (e: KeyboardEvent) => {
	const keys = ['Shift', 'Tab'];
	if (!keys.includes(e.key)) {
		f();
	}
};
