import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

function Cart() {
	const navigate = useNavigate();

	const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
		useCartStore();

	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	return (
		<main className='page cart-page'>
			<section className='container cart'>
				{cart.length === 0 ? (
					<p className='text-muted cart__empty'>Kundvagnen är tom.</p>
				) : (
					<>
						<div className='cart__list'>
							{cart.map((item) => (
								<article key={item.id} className='cart-item'>
									<div className='cart-item__info'>
										<h2>{item.name}</h2>
										<p>
											{item.when?.date} kl {item.when?.from} - {item.when?.to}
										</p>
									</div>

									<div className='cart-item__controls'>
										<p className='cart-item__price'>
											{item.price * item.quantity} sek
										</p>
										<div className='cart-item__quantity'>
											<button
												type='button'
												onClick={() =>
													item.quantity <= 1
														? removeFromCart(item.id)
														: decreaseQuantity(item.id)
												}>
												{' '}
												-{' '}
											</button>
											<span>{item.quantity}</span>
											<button
												type='button'
												onClick={() => increaseQuantity(item.id)}>
												{' '}
												+{' '}
											</button>
										</div>
									</div>
								</article>
							))}
						</div>

						<div className='cart__summary'>
							<p>Totalt värde på order</p>
							<strong>{totalPrice} sek</strong>
						</div>

						<button
							type='button'
							className='btn cart__btn'
							onClick={() => navigate('/order')}>
							Gå till order
						</button>
					</>
				)}
			</section>
		</main>
	);
}

export default Cart;
