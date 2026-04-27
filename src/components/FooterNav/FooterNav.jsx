import { NavLink } from 'react-router-dom';
import useCartStore from '../../store/useCartStore.js';
import './footerNav.css';

function FooterNav() {
	const cart = useCartStore((state) => state.cart);

	return (
		<nav className='footer-nav'>
			<NavLink to='/events'>Events</NavLink>
			<NavLink to='/order' className='cartLink'>
				Kundvagn
				{cart.length > 0 && <span className='badge'>{cart.length}</span>}
			</NavLink>
			<NavLink to='/tickets'>Biljetter</NavLink>
		</nav>
	);
}

export default FooterNav;
