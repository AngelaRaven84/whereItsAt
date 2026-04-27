import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<section>
			<h1>404</h1>
			<p>Sidan finns inte</p>

			<Link to='/'>Gå hem</Link>
		</section>
	);
}

export default NotFound;
