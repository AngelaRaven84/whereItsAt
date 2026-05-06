import { useEffect, useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import useCartStore from '../../store/useCartStore';
import TicketCard from '../../components/TicketCard/TicketCard';
import './tickets.css';

function Tickets() {
	const { showConfetti, stopConfetti, purchasedTickets } = useCartStore();

	const [activeTicketId, setActiveTicketId] = useState(null);

	const activeTicket = activeTicketId ?? purchasedTickets[0]?.ticketId;

	const sortedTickets = useMemo(() => {
		return [...purchasedTickets].sort((a, b) => {
			if (a.ticketId === activeTicket) return -1;
			if (b.ticketId === activeTicket) return 1;
			return 0;
		});
	}, [purchasedTickets, activeTicket]);

	useEffect(() => {
		if (!showConfetti) return;

		const timer = setTimeout(() => {
			stopConfetti();
		}, 4500);
		return () => clearTimeout(timer);
	}, [showConfetti, stopConfetti]);

	if (purchasedTickets.length === 0) {
		return (
			<main className='page tickets-page'>
				<section className='tickets-page__inner'>
					<p className='tickets-page__empty'>
						Du har inga köpta biljetter ännu.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className='page tickets-page'>
			{showConfetti && <Confetti />}

			<section className='tickets-page__inner'>
				<div className='tickets__stack' role='list' aria-label='Dina biljetter'>
					{sortedTickets.map((ticket, index) => {
						const isActive = ticket.ticketId === activeTicket;

						const nextTicket = sortedTickets[index + 1] ?? sortedTickets[0];
						const previousTicket =
							sortedTickets[index - 1] ??
							sortedTickets[sortedTickets.length - 1];

						return (
							<TicketCard
								key={ticket.ticketId}
								ticket={ticket}
								index={index}
								totalTickets={sortedTickets.length}
								isActive={isActive}
								onSelect={() => setActiveTicketId(ticket.ticketId)}
								onNext={() => setActiveTicketId(nextTicket.ticketId)}
								onPrevious={() => setActiveTicketId(previousTicket.ticketId)}
							/>
						);
					})}
				</div>
			</section>
		</main>
	);
}

export default Tickets;
