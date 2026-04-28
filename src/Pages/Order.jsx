import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

function Order() {
	const navigate = useNavigate();
	const { cart, checkout } = useCartStore();

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	const handleConfirmOrder = () => {
		checkout();
		navigate('/tickets');
	};

	if (cart.length === 0) {
		return (
			<main>
				<h1>Order</h1>
				<p>Det finns inga biljetter att boka.</p>
			</main>
		);
	}

	return (
		<main>
			<h1>Du är på väg att boka</h1>

			{cart.map((item) => (
				<article key={item.id}>
					<h2>{item.name}</h2>
					<p>Plats: {item.where}</p>
					<p>Datum: {item.when.date}</p>
					<p>
						Tid: {item.when.from} - {item.when.to}
					</p>
					<p>Antal: {item.quantity}</p>
					<p>Pris: {item.price} kr</p>
				</article>
			))}

			<h2>Totalpris: {totalPrice} kr</h2>

			<button onClick={handleConfirmOrder}>Bekräfta köp</button>
		</main>
	);
}

export default Order;
