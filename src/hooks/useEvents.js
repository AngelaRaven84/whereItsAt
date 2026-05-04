import { useEffect, useState } from 'react';
import { getEvents } from '../api/eventsApi';

function useEvents() {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchEvents() {
			try {
				const data = await getEvents();
				setEvents(data);
			} catch (error) {
				setError(error.message || 'Kunde inte hämta events');
			} finally {
				setIsLoading(false);
			}
		}
		fetchEvents();
	}, []);
	return { events, isLoading, error };
}

export default useEvents;
