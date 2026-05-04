import { useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useCartTotals from '../../hooks/useCartTotals';
import Drawer from '../Drawer/Drawer';
import './header.css';

export const Header = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
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
		if (location.pathname.includes('cart')) return 'Cart';
		if (location.pathname.includes('events')) return 'Events';
		return "Where It's @";
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
					{location.pathname !== '/' && (
						<button
							type='button'
							className='header__icon header__icon--visible'
							onClick={canGoBack}
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
						onClick={() => setIsDrawerOpen(true)}
						aria-label='Öppna kundvagn'>
						<ShoppingCart size={24} />
						{totalItems > 0 && (
							<span className='header__badge'>{totalItems}</span>
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
