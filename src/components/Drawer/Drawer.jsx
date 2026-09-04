import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import Button from '../Button/Button';
import './drawer.css';

function Drawer({ closeDrawer, isClosing }) {
	const navigate = useNavigate();
	const { cart, increaseQuantity, decreaseQuantity } = useCartStore();
	const { totalPrice } = useCartTotals(cart);

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].cart;
	const quantityLabels = translations[language].eventDetails;

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
				aria-label={t.title}>
				<div className='cart-drawer__header'>
					<h2>{t.title}</h2>

					<button
						type='button'
						className='cart-drawer__close'
						onClick={closeDrawer}
						aria-label={t.closeCart}>
						<X size={24} />
					</button>
				</div>

				{cart.length === 0 ? (
					<p className='text-muted'>{t.empty}</p>
				) : (
					<div className='cart-drawer__list'>
						{cart.map((item) => (
							<article key={item.id} className='cart-drawer__item'>
								<div className='cart-drawer__info'>
									<h3>{item.name}</h3>
									<p>{t.itemSummary(item.quantity, item.price)}</p>
								</div>

								<div className='drawer-quantity'>
									<Button
										variant='quantity'
										onClick={() => decreaseQuantity(item.id)}
										aria-label={quantityLabels.decreaseQuantity}>
										-
									</Button>

									<span>{item.quantity}</span>

									<Button
										variant='quantity'
										onClick={() => increaseQuantity(item.id)}
										aria-label={quantityLabels.increaseQuantity}>
										+
									</Button>
								</div>
							</article>
						))}
					</div>
				)}

				{cart.length > 0 && (
					<div className='cart-drawer__summary'>
						<span>{t.total}</span>
						<strong>{totalPrice} sek</strong>
					</div>
				)}

				<Button
					aria-label={t.goToCart}
					onClick={() => {
						closeDrawer();
						navigate('/cart');
					}}>
					{t.goToCart}
				</Button>
			</motion.aside>
		</motion.div>
	);
}

export default Drawer;
