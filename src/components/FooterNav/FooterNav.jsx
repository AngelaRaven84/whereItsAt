import { Home, CalendarDays, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import './footerNav.css';

function FooterNav({ placement = 'footer' }) {
	const navigate = useNavigate();
	const location = useLocation();

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].navigation;

	return (
		<nav className={`footer-nav footer-nav--${placement}`}>
			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/tickets' ? 'active' : ''}`}
				onClick={() => navigate('/tickets')}
				aria-label={t.tickets}>
				<Home size={24} />
				<span className='footer-nav__label'>{t.tickets}</span>
			</button>

			<button
				type='button'
				className={`footer-nav__link ${location.pathname === '/events' ? 'active' : ''}`}
				onClick={() => navigate('/events')}
				aria-label={t.events}>
				<CalendarDays size={24} />
				<span className='footer-nav__label'>{t.events}</span>
			</button>
			{placement === 'footer' && (
				<button
					type='button'
					className={`footer-nav__link ${location.pathname === '/cart' ? 'active' : ''}`}
					onClick={() => navigate('/cart')}
					aria-label={t.cart}>
					<ShoppingCart size={24} />
					<span className='footer-nav__label'>{t.cart}</span>
				</button>
			)}
		</nav>
	);
}

export default FooterNav;
