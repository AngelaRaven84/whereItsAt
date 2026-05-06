import { motion } from 'motion/react';
import logoIcon from '../../assets/logo.png';
import './home.css';

function Home() {
	return (
		<main className='page home'>
			<motion.section
				className='container center home__content'
				initial={{ opacity: 0, y: 96 }}
				animate={{ opacity: 1, y: -24 }}
				transition={{ duration: 0.5 }}>
				<img src={logoIcon} alt="Where It's @ icon" className='home__icon' />

				<h1 className='page-title home__title'>Where It's @</h1>

				<p className='home__tagline'>Ticketing made easy</p>
			</motion.section>
		</main>
	);
}

export default Home;
