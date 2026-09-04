import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import './orderItem.css';

function OrderItem({ item: { name, when, where, price, quantity } }) {
	const language = useLanguageStore((state) => state.language);
	const [day, month] = when?.date?.split(' ') || [];
	const translatedMonth = translations[language].months[month] || month;
	const timeConnector = translations[language].eventDetails.timeConnector;

	return (
		<article className='order-item'>
			<div className='order-item__info'>
				<h2 className='order-item__title'>{name}</h2>

				<p className='order-item__date'>
					{day} {translatedMonth} {timeConnector} {when?.from} - {when?.to}
				</p>

				<p className='order-item__location'>{where}</p>
			</div>

			<div className='order-item__meta'>
				<span>{quantity}</span>
				<strong>{price * quantity}</strong>
			</div>
		</article>
	);
}

export default OrderItem;
