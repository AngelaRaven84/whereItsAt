import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

function Order() {
	const navigate = useNavigate();
	const startConfetti = useCartStore((state) => state.startConfetti);
	const cart = useCartStore((state) => state.cart);
	const checkout = useCartStore((state) => state.checkout);

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		checkout();
		startConfetti();
		navigate('/tickets');
	};

	if (cart.length === 0) {
		return (
			<main className='page order-page'>
				<section className='container order'>
					<p className='text-muted order__empty'>
						Det finns inga biljetter att boka.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className='page order-page'>
			<section className='container order'>
				<h1 className='page-title'>Du är på väg att boka</h1>
				<div className='order__list'>
					{cart.map((item) => (
						<article key={item.id} className='order-item'>
							<div className='order-item__info'>
								<h2>{item.name}</h2>
								<p>
									{item.when?.date} kl {item.when?.from} - {item.when?.to}
								</p>
								<p>{item.where}</p>
							</div>
							<div className='order-item__meta'>
								<span>{item.quantity} st</span>
								<strong>{item.price * item.quantity} sek</strong>
							</div>
						</article>
					))}
				</div>
				<div className='order__summary'>
					<p>Totalt värde på order</p>
					<strong>{totalPrice} sek</strong>
				</div>

				<button
					type='button'
					className='btn order__btn'
					onClick={handleCheckout}>
					Bekräfta köp
				</button>
			</section>
		</main>
	);
}

export default Order;
