import { useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import FooterNav from '../FooterNav/FooterNav';
import Drawer from '../Drawer/Drawer';
import './header.css';

export const Header = ({ activeSlide }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const language = useLanguageStore((state) => state.language);
	const t = translations[language].navigation;
	const navigate = useNavigate();
	const location = useLocation();
	const cart = useCartStore((state) => state.cart);
	const { totalItems } = useCartTotals(cart);

	const closeDrawer = () => {
		setIsClosing(true);

		setTimeout(() => {
			setIsDrawerOpen(false);
			setIsClosing(false);
		}, 250);
	};

	const getTitle = () => {
		if (location.pathname.startsWith('/events/')) {
			return t.eventDetails;
		}

		switch (location.pathname) {
			case '/cart':
				return t.cart;
			case '/events':
				return t.events;
			case '/order':
				return t.checkout;
			case '/tickets':
				return t.tickets;
			case '/':
				return activeSlide === 1 ? t.events : "Where It's @";
			default:
				return "Where It's @";
		}
	};

	const canGoBack = () => {
		if (location.pathname.startsWith('/events')) {
			navigate('/events');
			return;
		}
		navigate(-1);
	};

	return (
		<>
			<header className='header'>
				<div className='header__side'>
					{location.pathname !== '/' && location.pathname !== '/events' && (
						<button
							type='button'
							className='header__icon header__icon--visible'
							onClick={canGoBack}
							aria-label={t.goBack}>
							<ArrowLeft size={24} />
						</button>
					)}
				</div>

				<h1 className='header__title'>{getTitle()}</h1>

				<FooterNav placement='header' />

				<div className='header__side header__side--right'>
					<button
						type='button'
						className='header__icon header__cart'
						onClick={() => setIsDrawerOpen(true)}
						aria-label={t.openCart}>
						<ShoppingCart size={24} />
						{totalItems > 0 && (
							<span
								aria-label={t.cartItems(totalItems)}
								className='header__badge'>
								{totalItems}
							</span>
						)}
					</button>
				</div>
			</header>

			{isDrawerOpen && (
				<Drawer closeDrawer={closeDrawer} isClosing={isClosing} />
			)}
		</>
	);
};

export default Header;
