import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import FooterNav from '../components/FooterNav/FooterNav';

function RootLayout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<FooterNav />
		</>
	);
}

export default RootLayout;
