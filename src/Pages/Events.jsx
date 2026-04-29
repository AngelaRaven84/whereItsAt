import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getEvents } from '../api/eventsApi';
import { useEffect, useState } from 'react';

function Events() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchEvents() {
			try {
				const eventsData = await getEvents();
				setEvents(eventsData);
			} catch (error) {
				setError('Kunde inte hämta events');
			} finally {
				setLoading(false);
			}
		}

		fetchEvents();
	}, []);

	if (loading) return <p>Laddar events...</p>;
	if (error) return <p>{error}</p>;

	return (
		<main className='page events'>
			<section className='container events__content'>
				<div className='events__list'>
					{events.map((event) => (
						<motion.article
							key={event.id}
							className='list-item event-card'
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}>
							<div className='date-box'>
								<span className='date-box__day'>
									{event.when?.date?.split(' ')[0]}
								</span>
								<span className='date-box__month'>
									{event.when?.date?.split(' ')[1]}
								</span>
							</div>

							<Link to={`/events/${event.id}`} className='event-card__content'>
								<h2 className='event-title'>{event.name}</h2>
								<p className='event-card__where'>{event.where}</p>
								<div className='event-card__bottom'>
									<span className='event-card__time'>
										{event.when?.from} - {event.when?.to}
									</span>
									<span className='price'>{event.price} sek</span>
								</div>
							</Link>
						</motion.article>
					))}
				</div>
			</section>
		</main>
	);
}

export default Events;
