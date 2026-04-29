import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Home from './Home';
import Events from './Events';

function Onboarding() {
	return (
		<Swiper
			modules={[Pagination]}
			pagination={{ clickable: true }}
			slidesPerView={1}>
			<SwiperSlide>
				<Home />
			</SwiperSlide>

			<SwiperSlide>
				<Events />
			</SwiperSlide>
		</Swiper>
	);
}

export default Onboarding;
