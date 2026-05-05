import { motion } from 'motion/react';
import useEventDetails from '../../hooks/useEventDetails';
import useQuantity from '../../hooks/useQuantity';
import useCartStore from '../../store/useCartStore';
import Button from '../../components/Button/Button';
import './eventDetails.css';

function EventDetails() {
	const addToCart = useCartStore((state) => state.addToCart);
	const { event, isLoading, error } = useEventDetails();
	const { quantity, increase, decrease } = useQuantity();

	const handleAddToCart = () => {
		addToCart({ ...event, quantity });
	};

	if (isLoading) return <p>Laddar event...</p>;
	if (error) return <p>{error}</p>;
	if (!event) return <p>Eventet hittades inte.</p>;

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
					<h2 className='ticket-box__price'>{event.price * quantity} sek</h2>

					<div className='ticket-box__quantity'>
						<Button
							variant='quantity'
							aria-label='Minska antalet biljetter'
							onClick={decrease}
							disabled={quantity <= 1}>
							-
						</Button>
						<span>{quantity}</span>
						<Button
							variant='quantity'
							aria-label='Öka antalet biljetter'
							onClick={increase}>
							+
						</Button>
					</div>
				</div>

				<Button aria-label='Lägg i kundvagnen' onClick={handleAddToCart}>
					Lägg i kundvagn
				</Button>
			</section>
		</motion.main>
	);
}

export default EventDetails;
