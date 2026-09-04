import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Home from '../Pages/Home/Home';
import Events from '../Pages/Events/Events';
import Header from '../components/Header/Header';
import FooterNav from '../components/FooterNav/FooterNav';

function Onboarding() {
	const [activeSlide, setActiveSlide] = useState(0);
	const [swiperInstance, setSwiperInstance] = useState(null);
	const showNavigation = activeSlide !== 0;
	const handleNavigate = (slideIndex) => {
		swiperInstance?.slideTo(slideIndex);
	};

	return (
		<main className='onboarding'>
			{showNavigation && <Header activeSlide={activeSlide} />}
			<Swiper
				slidesPerView={1}
				onSwiper={setSwiperInstance}
				onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}>
				<SwiperSlide>
					<Home onContinue={() => handleNavigate(1)} />
				</SwiperSlide>

				<SwiperSlide>
					<Events />
				</SwiperSlide>
			</Swiper>
			{showNavigation && (
				<FooterNav activeSlide={activeSlide} onNavigate={handleNavigate} />
			)}
		</main>
	);
}

export default Onboarding;
