import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import Button from '../../components/Button/Button';
import OrderItem from '../../components/OrderItem/OrderItem';
import './order.css';

function Order() {
	const navigate = useNavigate();
	const { cart, checkout } = useCartStore();

	const { totalPrice } = useCartTotals(cart);

	const handleCheckout = () => {
		checkout();
		navigate('/tickets');
	};

	if (cart.length === 0) {
		return (
			<main className='page order-page'>
				<section className='order-page__inner'>
					<p className='order-page__empty'>
						Det finns inga biljetter att boka.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className='page order-page'>
			<section className='order-page__inner'>
				<h1 className='order-page__title'>Du är på väg att boka</h1>

				<div className='order-page__list'>
					{cart.map((item) => (
						<OrderItem key={item.id} item={item} />
					))}
				</div>
				<div className='order-page__summary'>
					<p>Totalt värde på order</p>
					<strong>{totalPrice} sek</strong>
				</div>

				<Button aria-label='Bekräfta köp' onClick={handleCheckout}>
					Bekräfta köp
				</Button>
			</section>
		</main>
	);
}

export default Order;
