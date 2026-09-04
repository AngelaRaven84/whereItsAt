import useEvents from '../../hooks/useEvents.js';
import { useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import './events.css';

function Events() {
	const { events, isLoading, error } = useEvents();
	const [searchTerm, setSearchTerm] = useState('');

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].events;

	const filteredEvents = events.filter((event) =>
		event.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	if (isLoading) return <p>{t.loading}</p>;
	if (error) return <p>{t.error}</p>;

	return (
		<main className='page events'>
			<div className='events__inner'>
				<label htmlFor='event-search' className='sr-only'>
					{t.search}
				</label>

				<div className='events__search'>
					<input
						id='event-search'
						type='search'
						placeholder={t.search}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='input events__input'
					/>
				</div>

				<section className='events__content' aria-label={t.listLabel}>
					{filteredEvents.length === 0 ? (
						<p className='events__empty'>{t.empty}</p>
					) : (
						<div className='events__list'>
							{filteredEvents.map((event) => (
								<EventCard
									key={event.id}
									event={event}
									viewDetailsLabel={t.viewDetails(event.name)}
								/>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default Events;
