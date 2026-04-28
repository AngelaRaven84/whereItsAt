import useCartStore from '../store/useCartStore';

const Tickets = () => {
	const purchasedTickets = useCartStore((state) => state.purchasedTickets);

	if (purchasedTickets.length === 0) {
		return (
			<main>
				<h1>Dina biljetter</h1>
				<p>Du har inga köpta biljetter ännu.</p>
			</main>
		);
	}

	return (
		<main>
			<h1>Dina biljetter</h1>

			{purchasedTickets.map((ticket) => (
				<article key={ticket.tickedId}>
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
