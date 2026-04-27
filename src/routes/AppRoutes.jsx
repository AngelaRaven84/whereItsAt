import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import ProductDetails from '../Pages/ProductDetails';
import Cart from '../Pages/Cart';
import NotFound from '../Pages/NotFound';

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />} />
			<Route index element={<Home />} />
			<Route path='products' element={<Products />} />
			<Route path='products/:id' element={<ProductDetails />} />
			<Route path='cart' element={<Cart />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
