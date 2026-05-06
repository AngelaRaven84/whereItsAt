import Button from '../Button/Button';
import useCartStore from '../../store/useCartStore';
import './cartItem.css';

function CartItem({ item }) {
	const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

	const { id, name, when, price, quantity } = item;

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
					{when?.date} kl {when?.from} - {when?.to}
				</p>
			</div>

			<div className='cart-item__controls'>
				<h3 className='cart-item__price'>{price * quantity} sek</h3>

				<div className='cart-item__quantity'>
					<Button
						variant='quantity'
						aria-label={`Minska antal biljetter för ${name}`}
						onClick={handleDecrease}>
						-
					</Button>
					<span>{quantity}</span>

					<Button
						variant='quantity'
						aria-label={`Öka antal biljetter för ${name}`}
						onClick={() => increaseQuantity(id)}>
						+
					</Button>
				</div>
			</div>
		</article>
	);
}

export default CartItem;
