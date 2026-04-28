import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

function Cart() {
	const navigate = useNavigate();

	const {
		cart,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		clearCart,
	} = useCartStore();

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	if (cart.length === 0) {
		return (
			<main>
				<h1>Kundvagn</h1>
				<p>Din kundvagn är tom.</p>
			</main>
		);
	}

	return (
		<main>
			<h1>Kundvagn</h1>
			{cart.map((item) => (
				<article key={item.id}>
					<h2>{item.name}</h2>
					<p>Plats: {item.where}</p>
					<p>Datum: {item.when.date}</p>
					<p>
						Tid: {item.when.from} - {item.when.to}
					</p>
					<p>Pris: {item.price} kr/st</p>

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

			<button onClick={() => navigate('/order')}>Skicka order</button>

			<button onClick={clearCart}>Töm kundvagn</button>
		</main>
	);
}

export default Cart;
