import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Home from './Home';
import Events from './Events';
import Header from '../components/Header/Header';
import FooterNav from '../components/FooterNav/FooterNav';

function Onboarding() {
	const [activeSlide, setActiveSlide] = useState(0);
	const showNavigation = activeSlide === 1;

	return (
		<main className='onboarding'>
			{showNavigation && <Header />}

			<Swiper
				slidesPerView={1}
				onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}>
				<SwiperSlide>
					<Home />
				</SwiperSlide>

				<SwiperSlide>
					<Events />
				</SwiperSlide>
			</Swiper>

			{showNavigation && <FooterNav />}
		</main>
	);
}

export default Onboarding;
