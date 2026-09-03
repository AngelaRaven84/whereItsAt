import { Home, CalendarDays, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import './footerNav.css';

function FooterNav() {
	const navigate = useNavigate();
	const location = useLocation();

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].navigation;

	return (
		<nav className='footer-nav'>
			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/tickets' ? 'active' : ''}`}
				onClick={() => navigate('/tickets')}
				aria-label={t.tickets}>
				<Home size={24} />
			</button>

			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/events' ? 'active' : ''}`}
				onClick={() => navigate('/events')}
				aria-label={t.events}>
				<CalendarDays size={24} />
			</button>

			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/cart' ? 'active' : ''}`}
				onClick={() => navigate('/cart')}
				aria-label={t.cart}>
				<ShoppingCart size={24} />
			</button>
		</nav>
	);
}

export default FooterNav;
