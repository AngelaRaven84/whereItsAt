import useCartStore from '../store/useCartStore';

function Cart() {
	const cart = useCartStore((state) => state.cart);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const clearCart = useCartStore((state) => state.clearCart);

	const totalPrice = cart.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);

	if (cart.length === 0) {
		return <p>Din kundvagn är tom.</p>;
	}

	return (
		<section>
			<h1>Kundvagn</h1>
			{cart.map((item) => (
				<article key={item.id}>
					<h2>{item.name}</h2>
					<p>{item.where}</p>
					<p>{item.price} kr/st</p>

					<div>
						<button onClick={() => decreaseQuantity(item.id)}>-</button>
						<span>{item.quantity}</span>

						<button onClick={() => increaseQuantity(item.id)}>+</button>
					</div>

					<p>Totalt: {item.price * item.quantity} kr</p>

					<button onClick={() => removeFromCart(item.id)}>Ta bort</button>
				</article>
			))}

			<h2>Summa: {totalPrice} kr</h2>

			<button onClick={clearCart}>Töm kundvagn</button>
		</section>
	);
}

export default Cart;
