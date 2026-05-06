import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import './eventCard.css';

function EventCard({ event: { id, name, where, when, price } }) {
	const [day, month] = when?.date?.split(' ') || [];

	return (
		<motion.button
			className='eventCard'
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}>
			<div className='eventCard__date'>
				<span className='eventCard__day'>{day}</span>
				<span className='eventCard__month'>{month}</span>
			</div>

			<Link
				to={`/events/${id}`}
				aria-label={`Visa detaljer för ${name}`}
				className='eventCard__link'>
				<div className='eventCard__main'>
					<h2 className='event-title'>{name}</h2>
					<p className='eventCard__where'>{where}</p>
				</div>

				<div className='eventCard__meta'>
					<span className='eventCard__time'>
						{when?.from} - {when?.to}
					</span>
					<span className='price'>{price} sek</span>
				</div>
			</Link>
		</motion.button>
	);
}

export default EventCard;
