import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Onboarding from '../Pages/Onboarding';
import EventDetails from '../Pages/EventDetails';
import Cart from '../Pages/Cart';
import Order from '../Pages/Order';
import Tickets from '../Pages/Tickets';
import NotFound from '../Pages/NotFound';

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Onboarding />} />
				<Route path='/events/:id' element={<EventDetails />} />
				<Route path='cart' element={<Cart />} />
				<Route path='order' element={<Order />} />
				<Route path='tickets' element={<Tickets />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
//
