import { NavLink } from 'react-router-dom';
import useCartStore from '../../store/useCartStore.js';
import './footerNav.css';

function FooterNav() {
	const cart = useCartStore((state) => state.cart);
	const totalTickets = cart.reduce((sum, item) => {
		return sum + item.quantity;
	}, 0);

	return (
		<nav className='footer-nav'>
			<NavLink to='/events'>Events</NavLink>
			<NavLink to='/cart' className='cartLink'>
				Kundvagn
				{totalTickets > 0 && <span className='badge'>{totalTickets}</span>}
			</NavLink>
			<NavLink to='/tickets'>Biljetter</NavLink>
		</nav>
	);
}

export default FooterNav;
