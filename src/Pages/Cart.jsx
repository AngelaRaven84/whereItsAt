import { useState } from 'react';
import Confetti from 'react-confetti';
import useCartStore from '../store/useCartStore';

function Cart() {
	const [isOrdered, setIsOrdered] = useState(false);

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

	const handleOrder = () => {
		setIsOrdered(true);
		clearCart();
	};

	return (
		<main className='page cart-page'>
			{isOrdered && <Confetti />}

			<section className='container cart'>
				{cart.length === 0 && !isOrdered ? (
					<p className='text-muted cart__empty'>Kundvagnen är tom:</p>
				) : isOrdered ? (
					<div className='cart__success'>
						<h1>Tack för din order!</h1>
						<p>Dina biljetter är bokade.</p>
					</div>
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
							onClick={handleOrder}>
							Skicka order
						</button>
					</>
				)}
			</section>
		</main>
	);
}

export default Cart;
