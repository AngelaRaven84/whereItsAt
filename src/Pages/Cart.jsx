import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useCartTotals from '../hooks/useCartTotals';
import Button from '../components/Button/Button';

function Cart() {
	const navigate = useNavigate();
	const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
		useCartStore();
	const { totalItems, totalPrice } = useCartTotals(cart);

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
										<h3 className='cart-item__price'>
											{item.price * item.quantity} sek
										</h3>
										<div className='cart-item__quantity'>
											<Button
												variant='quantity'
												aria-label='Minska antalet biljetter'
												onClick={() =>
													item.quantity <= 1
														? removeFromCart(item.id)
														: decreaseQuantity(item.id)
												}>
												-
											</Button>
											<span>{item.quantity}</span>
											<Button
												variant='quantity'
												aria-label='Öka antalet biljetter'
												onClick={() => increaseQuantity(item.id)}>
												+
											</Button>
										</div>
									</div>
								</article>
							))}
						</div>

						<div className='cart__summary'>
							<p>Totalt värde på order</p>
							<strong>{totalPrice} sek</strong>
						</div>

						<Button
							aria-label='Gå till order'
							onClick={() => navigate('/order')}>
							Gå till order
						</Button>
					</>
				)}
			</section>
		</main>
	);
}

export default Cart;
