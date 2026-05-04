function useCartTotals(cart) {
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return { totalItems, totalPrice };
}

export default useCartTotals;
