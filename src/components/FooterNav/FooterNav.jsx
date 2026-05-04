import { Home, CalendarDays, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './footerNav.css';

function FooterNav({ activeSlide, onNavigate }) {
	const navigate = useNavigate();

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
