import './orderItem.css';

function OrderItem({ item: { name, when, where, price, quantity } }) {
	return (
		<article className='order-item'>
			<div className='order-item__info'>
				<h2 className='order-item__title'>{name}</h2>

				<p className='order-item__date'>
					{when?.date} kl {when?.from} - {when?.to}
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
