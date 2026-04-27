import { NavLink } from 'react-router-dom';
import './footerNav.css';

const FooterNav = () => {
	return (
		<nav className='footer-nav'>
			<NavLink to='/'>Hem</NavLink>
			<NavLink to='/products'>Produkter</NavLink>
			<NavLink to='/cart'>Kundvagn</NavLink>
		</nav>
	);
};

export default FooterNav;
