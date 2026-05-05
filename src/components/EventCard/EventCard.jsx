import { Link } from 'react-router-dom';
import './eventCard.css';

function EventCard({ event }) {
	return (
		<article className='eventCard'>
			<h2>{event.name}</h2>
			<p>{event.where}</p>
			<p>{event.when.date}</p>
			<p>{event.price}</p>

			<Link aria-label='visa detaljer' to={`/events/${event.id}`}>
				Visa detaljer
			</Link>
		</article>
	);
}

export default EventCard;
