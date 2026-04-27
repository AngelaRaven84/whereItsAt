import useCartStore from '../store/useCartStore';

function Order() {
	const cart = useCartStore((state) => state.cart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const clearCart = useCartStore((state) => state.clearCart);

	return (
		<section>
			<h1>Order</h1>

			{cart.length === 0 ? (
				<p>Din kundkorg är tom.</p>
			) : (
				<>
					{cart.map((event) => (
						<article key={event.id}>
							<h2>{event.name}</h2>
							<p>{event.price}</p>
							<p>Antal: {event.quantity}</p>

							<button onClick={() => removeFromCart(event.id)}>Ta bort</button>
						</article>
					))}
					<button onClick={clearCart}>Töm kundkorg</button>
				</>
			)}
		</section>
	);
}

export default Order;
