import { Home, CalendarDays, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './footerNav.css';

function FooterNav() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<nav className='footer-nav'>
			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/tickets' ? 'active' : ''}`}
				onClick={() => navigate('/tickets')}
				aria-label='Biljetter'>
				<Home size={24} />
			</button>

			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/events' ? 'active' : ''}`}
				onClick={() => navigate('/events')}
				aria-label='Events'>
				<CalendarDays size={24} />
			</button>

			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/cart' ? 'active' : ''}`}
				onClick={() => navigate('/cart')}
				aria-label='Kundvagn'>
				<ShoppingCart size={24} />
			</button>
		</nav>
	);
}

export default FooterNav;
