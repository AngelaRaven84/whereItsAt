import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
	return (
		<header className='header'>
			<Link to='/' className='logo'>
				Where It's @
			</Link>

			<nav className='desktop-nav'>
				<Link to='/cart'>Kundvagn</Link>
			</nav>
		</header>
	);
};

export default Header;
