import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../api/eventsApi';

function useEventDetails() {
	const { id } = useParams();

	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchEvent() {
			try {
				const data = await getEventsById(id);
				setEvent(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchEvent();
	}, [id]);
	return { event, isLoading, error };
}

export default useEventDetails;
