import { useEffect, useState } from 'react';
import { getEvents } from '../api/eventsApi';
import EventCard from '../components/EventCard/EventCard';

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
		<main>
			<h1>Events</h1>

			<section className='eventsGrid'>
				{events.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</section>
		</main>
	);
}

export default Events;
