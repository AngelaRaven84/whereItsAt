import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../api/eventsApi';
import useCartStore from '../store/useCartStore';

function EventDetails() {
	const addToCart = useCartStore((state) => state.addToCart);

	const { id } = useParams();

	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		async function fetchEvent() {
			try {
				const data = await getEventsById(id);
				setEvent(data);
			} catch (err) {
				setError('Kunde inte hämta eventet');
			} finally {
				setLoading(false);
			}
		}

		fetchEvent();
	}, [id]);

	if (loading) return <p>Laddar event...</p>;
	if (error) return <p>{error}</p>;
	if (!event) return <p>Eventet hittades inte.</p>;

	return (
		<article className='eventCard'>
			<h2>{event.name}</h2>
			<p>{event.where}</p>
			<p>
				{event.when.date} . {event.when.from}-{event.when.to}
			</p>
			<p>{event.price}</p>

			<button onClick={() => addToCart({ ...event, quantity })}>
				Köp {quantity} biljett(er)
			</button>
		</article>
	);
}

export default EventDetails;
