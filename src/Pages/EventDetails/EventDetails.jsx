import { motion } from 'motion/react';
import useEventDetails from '../../hooks/useEventDetails';
import useQuantity from '../../hooks/useQuantity';
import useCartStore from '../../store/useCartStore';
import useLanguageStore from '../../store/useLanguageStore';
import { translations } from '../../translations/translations';
import Button from '../../components/Button/Button';
import './eventDetails.css';

function EventDetails() {
	const addToCart = useCartStore((state) => state.addToCart);
	const { event, isLoading, error } = useEventDetails();
	const { quantity, increase, decrease } = useQuantity();

	const language = useLanguageStore((state) => state.language);
	const t = translations[language].eventDetails;

	if (isLoading) return <p>{t.loading}</p>;
	if (error) return <p>{t.error}</p>;
	if (!event) return <p>{t.notFound}</p>;

	const { name, where, when, price } = event;
	const [day, month] = when?.date?.split(' ') || [];
	const translatedMonth = translations[language].months[month] || month;
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
					<p className='event-details__eyebrow'>{t.intro}</p>

					<h1 className='event-details__title'>{name}</h1>
					<p className='event-details__date'>
						{day} {translatedMonth} {t.timeConnector} {when?.from} - {when?.to}
					</p>
					<p className='event-details__location'>@ {where}</p>
				</div>

				<div className='event-details__ticket'>
					<h2 className='event-details__price'>{totalPrice} sek</h2>

					<div className='event-details__quantity'>
						<Button
							variant='quantity'
							aria-label={t.decreaseQuantity}
							onClick={decrease}
							disabled={quantity <= 1}>
							-
						</Button>
						<span aria-label={t.quantity(quantity)}>{quantity}</span>

						<Button
							variant='quantity'
							aria-label={t.increaseQuantity}
							onClick={increase}>
							+
						</Button>
					</div>
				</div>

				<Button aria-label={t.addToCart} onClick={handleAddToCart}>
					{t.addToCart}
				</Button>
			</section>
		</motion.main>
	);
}

export default EventDetails;
