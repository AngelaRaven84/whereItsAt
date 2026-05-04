import useCartStore from '../store/useCartStore';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'motion/react';

const Tickets = () => {
	const showConfetti = useCartStore((state) => state.showConfetti);
	const stopConfetti = useCartStore((state) => state.stopConfetti);
	const purchasedTickets = useCartStore((state) => state.purchasedTickets);
	const [activeTicketId, setActiveTicketId] = useState(null);
	const activeTicket = activeTicketId ?? purchasedTickets[0]?.ticketId;

	useEffect(() => {
		if (showConfetti) {
			const timer = setTimeout(() => {
				stopConfetti();
			}, 4500);
			return () => clearTimeout(timer);
		}
	}, [showConfetti, stopConfetti]);

	if (purchasedTickets.length === 0) {
		return (
			<main className='page tickets-page'>
				<section className='container tickets'>
					<p className='text-muted tickets__empty'>
						Du har inga köpta biljetter ännu.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className='page tickets-page'>
			{showConfetti && <Confetti />}
			<section className='container tickets'>
				<div className='tickets__stack'>
					{purchasedTickets.map((ticket, index) => {
						const isActive = ticket.ticketId === activeTicket;

						return (
							<motion.article
								key={ticket.ticketId}
								className={`ticket ${isActive ? 'ticket--active' : ''}`}
								style={{
									zIndex: isActive ? 50 : purchasedTickets.length - index,
								}}
								initial={false}
								animate={{
									y: isActive ? 0 : index * -18,
									x: isActive ? 0 : index * 14,
									rotate: isActive ? 0 : index * 2,
									scale: isActive ? 1 : 1 - index * 0.02,
									opacity: isActive ? 1 : 0.75,
								}}
								whileHover={{
									y: isActive ? -4 : index * -18 - 6,
									x: isActive ? 0 : index * 14 + 4,
									opacity: 0.95,
								}}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 24,
								}}
								onClick={() => setActiveTicketId(ticket.ticketId)}>
								<section className='ticket__section ticket__what'>
									<span className='ticket__label'>What</span>
									<h2>{ticket.name}</h2>
								</section>

								<section className='ticket__section ticket__where'>
									<span className='ticket__label'>Where</span>
									<p>{ticket.where}</p>
								</section>

								<section className='ticket__details'>
									<div>
										<span className='ticket__label'>When</span>
										<p>{ticket.when.date}</p>
									</div>

									<div>
										<span className='ticket__label'>From</span>
										<p>{ticket.when.from}</p>
									</div>

									<div>
										<span className='ticket__label'>To</span>
										<p>{ticket.when.to}</p>
									</div>
								</section>

								<section className='ticket__code'>
									<p>{ticket.ticketId.slice(0, 8).toUpperCase()}</p>
									<span>#{ticket.ticketId.slice(0, 8).toUpperCase()}</span>
								</section>

								<section className='ticket__footer'>
									<p>Ordernummer</p>
									<span>{ticket.orderNumber}</span>
								</section>
							</motion.article>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default Tickets;
