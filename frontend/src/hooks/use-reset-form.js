import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();

	useEffect(() => {
		let currentLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let prevLogout = currentLogout;
			currentLogout = store.getState().app.wasLogout;

			if (prevLogout !== currentLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
