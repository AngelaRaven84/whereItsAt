import { products } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';

function Products() {
	return (
		<section>
			<h1>Produkter</h1>

			<div className='product-grid'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

export default Products;
