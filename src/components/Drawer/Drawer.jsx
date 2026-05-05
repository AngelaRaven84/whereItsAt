import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import Button from '../Button/Button';
import './drawer.css';

function Drawer({ closeDrawer, isClosing }) {
	const navigate = useNavigate();
	const cart = useCartStore((state) => state.cart);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const { totalPrice } = useCartTotals(cart);

	return (
		<motion.div
			className='drawer-overlay'
			onClick={closeDrawer}
			initial={{ opacity: 0 }}
			animate={{ opacity: isClosing ? 0 : 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}>
			<motion.aside
				className='cart-drawer'
				onClick={(e) => e.stopPropagation()}
				initial={{ x: '100%' }}
				animate={{ x: isClosing ? '100%' : 0 }}
				exit={{ x: '100%' }}
				transition={{ duration: 0.25, ease: 'easeOut' }}
				aria-label='Kundvagb'>
				<div className='cart-drawer__header'>
					<h2>Din kundvagn</h2>

					<button
						type='button'
						className='cart-drawer__close'
						onClick={closeDrawer}
						aria-label='Stäng kundvagn'>
						<X size={24} />
					</button>
				</div>

				{cart.length === 0 ? (
					<p className='text-muted'>Kundvagnen är tom.</p>
				) : (
					<div className='cart-drawer__list'>
						{cart.map((item) => (
							<article key={item.id} className='cart-drawer__item'>
								<div className='cart-drawer__info'>
									<h3>{item.name}</h3>
									<p>
										{item.quantity} st · {item.price} sek/st
									</p>
								</div>

								<div className='drawer-quantity'>
									<Button
										variant='quantity'
										onClick={() => decreaseQuantity(item.id)}
										aria-label={`Minska antal biljetter för ${item.name}`}>
										-
									</Button>

									<span>{item.quantity}</span>

									<Button
										variant='quantity'
										onClick={() => increaseQuantity(item.id)}
										aria-label={`Öka antal biljetter för ${item.name}`}>
										+
									</Button>
								</div>
							</article>
						))}
					</div>
				)}

				{cart.length > 0 && (
					<div className='cart-drawer__summary'>
						<span>Totalt värde</span>
						<strong>{totalPrice} sek</strong>
					</div>
				)}

				<Button
					onClick={() => {
						closeDrawer();
						navigate('/cart');
					}}>
					Gå till kundvagn
				</Button>
			</motion.aside>
		</motion.div>
	);
}

export default Drawer;
