import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import Button from '../../components/Button/Button';
import OrderItem from '../../components/OrderItem/OrderItem';
import './order.css';

function Order() {
	const navigate = useNavigate();
	const { cart, checkout } = useCartStore();

	const { totalPrice } = useCartTotals(cart);

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].order;
	const totalLabel = translations[language].cart.total;

	const handleCheckout = () => {
		checkout();
		navigate('/tickets');
	};

	if (cart.length === 0) {
		return (
			<main className='page order-page'>
				<section className='order-page__inner'>
					<p className='order-page__empty'>{t.empty}</p>
				</section>
			</main>
		);
	}

	return (
		<main className='page order-page'>
			<section className='order-page__inner'>
				<h1 className='order-page__title'>{t.title}</h1>

				<div className='order-page__list'>
					{cart.map((item) => (
						<OrderItem key={item.id} item={item} />
					))}
				</div>
				<div className='order-page__summary'>
					<p>{totalLabel}</p>
					<strong>{totalPrice} sek</strong>
				</div>

				<Button aria-label={t.confirmPurchase} onClick={handleCheckout}>
					{t.confirmPurchase}
				</Button>
			</section>
		</main>
	);
}

export default Order;
