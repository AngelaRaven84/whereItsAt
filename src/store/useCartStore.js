import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const section = [
	'Section A',
	'Section B',
	'Section C',
	'Section D',
	'Section E',
];

const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [],
			purchasedTickets: [],
			showConfetti: false,

			startConfetti: () => set({ showConfetti: true }),
			stopConfetti: () => set({ showConfetti: false }),

			addToCart: (event) => {
				const cart = get().cart;
				const quantityToAdd = event.quantity || 1;
				const existingEvent = cart.find((item) => item.id === event.id);

				if (existingEvent) {
					set({
						cart: cart.map((item) =>
							item.id === event.id
								? { ...item, quantity: item.quantity + quantityToAdd }
								: item,
						),
					});
				} else {
					set({
						cart: [...cart, { ...event, quantity: quantityToAdd }],
					});
				}
			},

			increaseQuantity: (id) => {
				set({
					cart: get().cart.map((item) =>
						item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
					),
				});
			},

			decreaseQuantity: (id) => {
				set({
					cart: get()
						.cart.map((item) =>
							item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
						)
						.filter((item) => item.quantity > 0),
				});
			},

			removeFromCart: (id) => {
				set({
					cart: get().cart.filter((item) => item.id !== id),
				});
			},

			clearCart: () => {
				set({ cart: [] });
			},

			checkout: () => {
				const cart = get().cart;
				const randSection = section[Math.floor(Math.random() * section.length)];
				const totTickets = cart.reduce(
					(sum, ticket) => sum + ticket.quantity,
					0,
				);
				const totSeats = 50;
				const firstSeat =
					Math.floor(Math.random() * (totSeats - totTickets + 1)) + 1;
				let seatCounter = 0;
				const ticketWithSeat = cart.flatMap((ticket) =>
					Array.from({ length: ticket.quantity }, () => {
						const newTicket = {
							...ticket,
							quantity: 1,
							section: randSection,
							seat: firstSeat + seatCounter,
							ticketId: crypto.randomUUID(),
						};
						seatCounter++;
						return newTicket;
					}),
				);

				set({
					purchasedTickets: ticketWithSeat,
					cart: [],
					showConfetti: true,
				});
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				cart: state.cart,
				newTicket: state.newTicket,
			}),
		},
	),
);

export default useCartStore;
