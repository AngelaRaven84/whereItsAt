import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import useEvents from '../../hooks/useEvents.js';
import { useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './events.css';

function Events() {
	const { events, isLoading, error } = useEvents();
	const [searchTerm, setSearchTerm] = useState('');

	const filteredEvents = events.filter((event) =>
		event.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (isLoading) return <p>Laddar events...</p>;
	if (error) return <p>{error}</p>;

	return (
		<main className='page events'>
			<div className='events__inner'>
				<label htmlFor='event-search' className='sr-only'>
					Sök event
				</label>

				<div className='events__search'>
					<input
						id='event-search'
						type='search'
						placeholder='Sök event'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='input events__input'
					/>
				</div>

				<section className='events__content' aria-label='Eventlista'>
					{filteredEvents.length === 0 ? (
						<p className='events__empty'>Inga events hittades.</p>
					) : (
						<div className='events__list'>
							{filteredEvents.map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default Events;
