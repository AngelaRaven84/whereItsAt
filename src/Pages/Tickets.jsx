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
	const sortedTickets = [...purchasedTickets].sort((a, b) => {
		if (a.ticketId === activeTicket) return -1;
		if (b.ticketId === activeTicket) return 1;
		return 0;
	});

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
					{sortedTickets.map((ticket, index) => {
						const isActive = ticket.ticketId === activeTicket;

						return (
							<motion.article
								key={ticket.ticketId}
								className={`ticket ${isActive ? 'ticket--active' : ''}`}
								style={{
									zIndex: purchasedTickets.length - index,
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

									<div className='ticket__seating'>
										<span className='ticket__label'>info</span>
										<p>
											{ticket.section} - seat {ticket.seat}
										</p>
									</div>
								</section>
								<section className='ticket__code'>
									<h3>{ticket.ticketId.slice(0, 5).toUpperCase()}</h3>
									<span>#{ticket.ticketId.slice(0, 5).toUpperCase()}</span>
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
