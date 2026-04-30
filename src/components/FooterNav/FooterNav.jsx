import { Home, CalendarDays, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore.js';
import './footerNav.css';

function FooterNav({ activeSlide, onNavigate }) {
	const navigate = useNavigate();
	const cart = useCartStore((state) => state.cart);
	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<nav className='footer-nav'>
			<button
				type='button'
				className={`footer-nav__link ${activeSlide === 0 ? 'active' : ''}`}
				onClick={() => navigate('/tickets')}
				aria-label='Biljetter'>
				<Home size={24} />
			</button>

			<button
				type='button'
				className={`footer-nav__link ${activeSlide === 1 ? 'active' : ''}`}
				onClick={() => onNavigate(1)}
				aria-label='Events'>
				<CalendarDays size={24} />
			</button>

			<button
				type='button'
				className='footer-nav__link'
				onClick={() => navigate('/cart')}
				aria-label='Kundvagn'>
				<ShoppingCart size={24} />
			</button>
		</nav>
	);
}

export default FooterNav;
