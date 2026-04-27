import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

function ProductDetails() {
	const { id } = useParams();

	const product = products.find((product) => product.id === Number(id));

	if (!product) {
		return <h1>Produkten finns inte</h1>;
	}

	return (
		<section>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
			<p>{product.price}</p>

			<button>Lägg i kundvagn</button>

			<br />

			<Link to='/products'>Tillbaka till produkter</Link>
		</section>
	);
}

export default ProductDetails;
