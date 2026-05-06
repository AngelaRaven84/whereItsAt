import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import FooterNav from '../components/FooterNav/FooterNav';

function RootLayout() {
	const location = useLocation();
	const isStartPage = location.pathname === '/';

	return (
		<main>
			{!isStartPage && <Header />}
			<Outlet />
			{!isStartPage && <FooterNav />}
		</main>
	);
}

export default RootLayout;
