import Button from '../Button/Button';
import useCartStore from '../../store/useCartStore';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import './cartItem.css';

function CartItem({ item }) {
	const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

	const { id, name, when, price, quantity } = item;

	const language = useLanguageStore((state) => state.language);
	const [day, month] = when?.date?.split(' ') || [];
	const translatedMonth = translations[language].months[month] || month;
	const timeConnector = translations[language].eventDetails.timeConnector;
	const t = translations[language].eventDetails;

	const handleDecrease = () => {
		if (quantity <= 1) {
			removeFromCart(id);
			return;
		}
		decreaseQuantity(id);
	};

	return (
		<article className='cart-item'>
			<div className='cart-item__info'>
				<h2 className='cart-item__title'>{name}</h2>

				<p className='cart-item__date'>
					{day} {translatedMonth} {timeConnector} {when?.from} - {when?.to}
				</p>
			</div>

			<div className='cart-item__controls'>
				<h3 className='cart-item__price'>{price * quantity} sek</h3>

				<div className='cart-item__quantity'>
					<Button
						variant='quantity'
						aria-label={t.decreaseQuantity}
						onClick={handleDecrease}>
						-
					</Button>
					<span>{quantity}</span>

					<Button
						variant='quantity'
						aria-label={t.increaseQuantity}
						onClick={() => increaseQuantity(id)}>
						+
					</Button>
				</div>
			</div>
		</article>
	);
}

export default CartItem;
