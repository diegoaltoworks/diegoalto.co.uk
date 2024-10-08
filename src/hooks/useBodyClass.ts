import { useEffect } from "react";

const addBodyClass = (className: string) =>
	document.body.classList.add(className);
const removeBodyClass = (className: string) =>
	document.body.classList.remove(className);

export const useBodyClass = (className: string | string[]) => {
	useEffect(() => {
		if (className && className?.length !== 0) {
			// Add class
			className instanceof Array
				? className.map(addBodyClass)
				: addBodyClass(className);
		}

		// Remove class
		return () => {
			className instanceof Array
				? className.map(removeBodyClass)
				: removeBodyClass(className);
		};
	}, [className]);
};
