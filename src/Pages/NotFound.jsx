import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<section>
			<h1>404</h1>
			<p>Sidan finns inte</p>

			<Link aria-label='Gå tillbaka' to='/'>
				Gå tillbaka
			</Link>
		</section>
	);
}

export default NotFound;
