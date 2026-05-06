import { motion } from 'motion/react';
import './ticketCard.css';

function TicketCard({
	ticket,
	index,
	totalTickets,
	isActive,
	onSelect,
	onNext,
	onPrevious,
}) {
	const ticketCode = ticket.ticketId.slice(0, 5).toUpperCase();

	return (
		<motion.button
			type='button'
			aria-label={`Visa biljett ${index + 1}: ${ticket.name}`}
			aria-pressed={isActive}
			className={`ticket ${isActive ? 'ticket--active' : ''}`}
			style={{ zIndex: totalTickets - index }}
			initial={false}
			animate={{
				y: isActive ? 0 : index * -14,
				x: isActive ? 0 : index * 10,
				rotate: isActive ? 0 : index * 1.5,
				scale: isActive ? 1 : 1 - index * 0.02,
				opacity: isActive ? 1 : 0.75,
			}}
			whileHover={{
				y: isActive ? -4 : index * -14 - 4,
				x: isActive ? 0 : index * 10 + 3,
				opacity: 0.95,
			}}
			transition={{
				type: 'spring',
				stiffness: 260,
				damping: 24,
			}}
			onClick={onSelect}
			onKeyDown={(e) => {
				if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
					e.preventDefault();
					onNext();
				}

				if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
					e.preventDefault();
					onPrevious();
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
					<h3>{ticket.when?.date}</h3>
				</div>

				<div>
					<span className='ticket__label'>From</span>
					<h3>{ticket.when?.from}</h3>
				</div>

				<div>
					<span className='ticket__label'>To</span>
					<h3>{ticket.when?.to}</h3>
				</div>
			</section>

			<section className='ticket__section ticket__info'>
				<span className='ticket__label'>Info</span>
				<h3>
					{ticket.section} - seat {ticket.seat}
				</h3>
			</section>

			<section className='ticket__code'>
				<h3>{ticketCode}</h3>
				<span>#{ticketCode}</span>
			</section>
		</motion.button>
	);
}

export default TicketCard;
