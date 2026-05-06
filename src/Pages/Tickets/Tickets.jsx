import useCartStore from '../../store/useCartStore';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'motion/react';
import './tickets.css';

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
				<div className='tickets__stack' role='list' aria-label='Dina biljetter'>
					{sortedTickets.map((ticket, index) => {
						const isActive = ticket.ticketId === activeTicket;

						return (
							<motion.button
								key={ticket.ticketId}
								type='button'
								aria-label={`Visa biljett ${index + 1}: ${ticket.name}`}
								aria-pressed={isActive}
								className={`ticket ${isActive ? 'ticket--active' : ''}`}
								style={{
									zIndex: sortedTickets.length - index,
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
								onClick={() => setActiveTicketId(ticket.ticketId)}
								onKeyDown={(e) => {
									if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
										e.preventDefault();
										const nextTicket =
											sortedTickets[index + 1] ?? sortedTickets[0];
										setActiveTicketId(nextTicket.ticketId);
									}
									if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
										e.preventDefault();
										const previousTicket =
											sortedTickets[index - 1] ??
											sortedTickets[sortedTickets.length - 1];
										setActiveTicketId(previousTicket.ticketId);
									}
								}}>
								<section className='ticket__section ticket__what'>
									<span className='ticket__label'>What</span>
									<h2>{ticket.name}</h2>
								</section>

								<section className='ticket__section ticket__where'>
									<span className='ticket__label'>Where</span>
									<h3>{ticket.where}</h3>
								</section>

								<section className='ticket__time'>
									<div>
										<span className='ticket__label'>When</span>
										<h3>{ticket.when.date}</h3>
									</div>

									<div>
										<span className='ticket__label'>From</span>
										<h3>{ticket.when.from}</h3>
									</div>

									<div>
										<span className='ticket__label'>To</span>
										<h3>{ticket.when.to}</h3>
									</div>
								</section>

								<section className='ticket__info'>
									<span className='ticket__label'>info</span>
									<h3>
										{ticket.section} - seat {ticket.seat}
									</h3>
								</section>

								<section className='ticket__code'>
									<h3>{ticket.ticketId.slice(0, 5).toUpperCase()}</h3>
									<span>#{ticket.ticketId.slice(0, 5).toUpperCase()}</span>
								</section>
							</motion.button>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default Tickets;
