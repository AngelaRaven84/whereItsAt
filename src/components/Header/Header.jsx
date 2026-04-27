import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
	return (
		<header className='header'>
			<Link to='/' className='logo'>
				ShopApp
			</Link>

			<nav className='desktop-nav'>
				<Link to='/products'>Produkter</Link>
				<Link to='/cart'>Kundvagn</Link>
			</nav>
		</header>
	);
};

export default Header;
