import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Onboarding from '../layouts/Onboarding';
import Events from '../Pages/Events/Events';
import EventDetails from '../Pages/EventDetails/EventDetails';
import Cart from '../Pages/Cart/Cart';
import Order from '../Pages/Order/Order';
import Tickets from '../Pages/Tickets/Tickets';
import NotFound from '../Pages/NotFound/NotFound';

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Onboarding />} />
				<Route path='events' element={<Events />} />
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
