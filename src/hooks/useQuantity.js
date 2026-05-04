import { useState } from 'react';

function useQuantity(startValue = 1) {
	const [quantity, setQuantity] = useState(startValue);

	function increase() {
		setQuantity((prev) => prev + 1);
	}

	function decrease() {
		setQuantity((prev) => {
			if (prev <= 1) return 1;
			return prev - 1;
		});
	}
	return { quantity, increase, decrease, setQuantity };
}

export default useQuantity;
