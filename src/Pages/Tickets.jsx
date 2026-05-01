import useCartStore from '../store/useCartStore';
import { useEffect } from 'react';
import Confetti from 'react-confetti';

const Tickets = () => {
	const showConfetti = useCartStore((state) => state.showConfetti);
	const stopConfetti = useCartStore((state) => state.stopConfetti);
	const purchasedTickets = useCartStore((state) => state.purchasedTickets);
	console.log(purchasedTickets);

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
			<main>
				<p>Du har inga köpta biljetter ännu.</p>
			</main>
		);
	}

	return (
		<main>
			{showConfetti && <Confetti />}
			{purchasedTickets.map((ticket) => (
				<article key={ticket.ticketId}>
					<h2>{ticket.name}</h2>

					<p>Plats: {ticket.where}</p>
					<p>Datum: {ticket.when.date}</p>
					<p>
						Tid: {ticket.when.from} - {ticket.when.to}
					</p>
					<p>Antal: {ticket.quantity}</p>
					<p>Pris: {ticket.price}</p>

					<p>Ordernummer: {ticket.orderNumber}</p>
					<p>Biljett-ID: {ticket.ticketId}</p>
				</article>
			))}
		</main>
	);
};

export default Tickets;
