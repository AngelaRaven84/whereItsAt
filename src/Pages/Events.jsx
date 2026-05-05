import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import useEvents from '../hooks/useEvents.js';
import { useState } from 'react';

function Events() {
	const { events, isLoading, error } = useEvents();
	const [searchTerm, setSearchTerm] = useState('');

	if (isLoading) return <p>Laddar events...</p>;
	if (error) return <p>{error}</p>;

	const filteredEvents = events.filter((event) =>
		event.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<main className='page events'>
			<label htmlFor='event-search' className='sr-only'>
				Sök event
			</label>
			<div className='input-wrapper'>
				<input
					id='event-search'
					type='search'
					placeholder='Sök event'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='input'
				/>
			</div>

			<section className='container events__content'>
				<div className='events__list'>
					{filteredEvents.length === 0 ? (
						<p>Inga events hittades.</p>
					) : (
						filteredEvents.map((event) => (
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

								<Link
									to={`/events/${event.id}`}
									aria-label={`Visa detaljer för ${event.name}`}
									className='event-card__content'>
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
						))
					)}
				</div>
			</section>
		</main>
	);
}

export default Events;
