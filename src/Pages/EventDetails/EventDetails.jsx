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

	if (isLoading) return <p>Laddar event...</p>;
	if (error) return <p>{error}</p>;
	if (!event) return <p>Eventet hittades inte.</p>;

	const { name, where, when, price } = event;
	const totalPrice = price * quantity;

	const handleAddToCart = () => {
		addToCart({ ...event, quantity });
	};

	return (
		<motion.main
			className='page event-details'
			initial={{ opacity: 0, y: 14 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35 }}>
			<section className='event-details__inner'>
				<div className='event-details__hero'>
					<p className='event-details__eyebrow'>
						You are about to score some tickets to
					</p>

					<h1 className='event-details__title'>{name}</h1>
					<p className='event-details__date'>
						{when?.date} kl {when?.from} - {when?.to}
					</p>
					<p className='event-details__location'>@ {where}</p>
				</div>

				<div className='event-details__ticket'>
					<h2 className='event-details__price'>{totalPrice} sek</h2>

					<div className='event-details__quantity'>
						<Button
							variant='quantity'
							aria-label='Minska antalet biljetter'
							onClick={decrease}
							disabled={quantity <= 1}>
							-
						</Button>
						<span aria-label={`Antal biljetter: ${quantity}`}>{quantity}</span>

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
