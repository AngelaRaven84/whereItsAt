import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { getEvents, getEventsById } from '../api/eventsApi';
import useCartStore from '../store/useCartStore';

function EventDetails() {
	const { id } = useParams();
	const addToCart = useCartStore((state) => state.addToCart);

	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		async function fetchEvent() {
			try {
				const data = await getEventsById(id);

				if (!data) {
					setError('Eventet hittades inte.');
					return;
				}

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

	return (
		<motion.main
			className='page details-page'
			initial={{ opacity: 0, y: 14 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35 }}>
			<section className='container detail'>
				<div className='detail__hero'>
					<p className='detail__eyebrow'>
						You are about to score some tickets to
					</p>
					<h1 className='detail__title'>{event.name}</h1>
					<p className='detail__date'>
						{event.when?.date} kl {event.when?.from} - {event.when?.to}
					</p>
					<p className='detail__location'>@ {event.where}</p>
				</div>

				<div className='ticket-box'>
					<p className='ticket-box__price'>{event.price * quantity} sek</p>

					<div className='ticket-box__quantity'>
						<button
							type='button'
							onClick={() => setQuantity(quantity - 1)}
							disabled={quantity <= 1}>
							-
						</button>
						<span>{quantity}</span>
						<button type='button' onClick={() => setQuantity(quantity + 1)}>
							+
						</button>
					</div>
				</div>

				<button
					type='button'
					className='btn detail__btn'
					onClick={() => addToCart(event)}>
					Lägg i kundvagn
				</button>
			</section>
		</motion.main>
	);
}

export default EventDetails;
