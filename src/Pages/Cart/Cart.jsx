import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import useCartTotals from '../../hooks/useCartTotals';
import Button from '../../components/Button/Button';
import CartItem from '../../components/CartItem/CartItem';
import './cart.css';

function Cart() {
	const navigate = useNavigate();
	const cart = useCartStore((s) => s.cart);
	const { totalPrice } = useCartTotals(cart);

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].cart;

	return (
		<main className='page cart-page'>
			<section className='cart-page__inner'>
				{cart.length === 0 ? (
					<p className='cart-page__empty'>{t.empty}</p>
				) : (
					<>
						<div className='cart-page__list'>
							{cart.map((item) => (
								<CartItem key={item.id} item={item} />
							))}
						</div>

						<div className='cart-page__summary'>
							<p>{t.total}</p>
							<strong>{totalPrice} sek</strong>
						</div>

						<Button aria-label={t.goToOrder} onClick={() => navigate('/order')}>
							{t.goToOrder}
						</Button>
					</>
				)}
			</section>
		</main>
	);
}

export default Cart;
