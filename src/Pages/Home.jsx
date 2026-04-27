import { Link } from 'react-router-dom';

function Home() {
	return (
		<section>
			<h1>Välkommen</h1>
			<p>Här kan du hitta och boka events.</p>

			<Link to='/products'>Se alla produkter</Link>
		</section>
	);
}

export default Home;
