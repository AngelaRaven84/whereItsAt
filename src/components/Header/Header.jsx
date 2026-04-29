import { useState } from 'react';
import { ArrowLeft, ShoppingCart, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import './header.css';

export const Header = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const cart = useCartStore((state) => state.cart);
	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	const getTitle = () => {
		if (location.pathname.includes('cart')) return 'Cart';
		if (location.pathname.includes('events')) return 'Events';
		return "Where It's @";
	};

	const closeCart = () => {
		setIsClosing(true);

		setTimeout(() => {
			setIsCartOpen(false);
			setIsClosing(false);
		}, 250);
	};

	const canGoBack = location.pathname !== '/';

	return (
		<>
			<header className='header'>
				<div className='header__side'>
					{canGoBack && (
						<button
							type='button'
							className='header__icon header__icon--visible'
							onClick={() => navigate(-1)}
							aria-label='Gå tillbaka'>
							<ArrowLeft size={24} />
						</button>
					)}
				</div>

				<h1 className='header__title'>{getTitle()}</h1>

				<div className='header__side header__side--right'>
					<button
						type='button'
						className='header__icon header__cart'
						onClick={() => setIsCartOpen(true)}
						aria-label='Öppna kundvagn'>
						<ShoppingCart size={24} />
						{cartCount > 0 && (
							<span className='header__badge'>{cartCount}</span>
						)}
					</button>
				</div>
			</header>

			{isCartOpen && (
				<div
					className={`drawer-overlay ${isClosing ? 'closing' : ''}`}
					onClick={closeCart}>
					<aside
						className={`cart-drawer ${isClosing ? 'closing' : ''}`}
						onClick={(e) => e.stopPropagation()}>
						<div className='cart-drawer__header'>
							<h2>Din kundvagn</h2>

							<button
								type='button'
								className='header__icon'
								onClick={() => closeCart()}
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
										<h3>{item.name}</h3>
										<p>
											{item.quantity} st · {item.price} sek
										</p>
									</article>
								))}
							</div>
						)}

						<button
							type='button'
							className='btn cart-drawer__btn'
							onClick={() => {
								closeCart();
								navigate('/cart');
							}}>
							Gå till kundvagn
						</button>
					</aside>
				</div>
			)}
		</>
	);
};

export default Header;
