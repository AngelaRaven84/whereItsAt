import { Link } from 'react-router-dom';
import './productCard';

const ProductCard = ({ product }) => {
	return (
		<article className='product-card'>
			<h2>{product.title}</h2>
			<p>{product.price}</p>

			<Link to={`/products/${product.id}`}>Visa detaljer</Link>
		</article>
	);
};

export default ProductCard;
