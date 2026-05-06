import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateTicketId = () => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVwXYZ0123456789';

	return Array.from({ length: 5 }, () =>
		chars.charAt(Math.floor(Math.random() * chars.length)),
	).join('');
};

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
				const sections = [
					'Section A',
					'Section B',
					'Section C',
					'Section D',
					'Section E',
				];

				const purchasedTickets = get().cart.flatMap((event) => {
					const randSection =
						sections[Math.floor(Math.random() * sections.length)];

					const firstSeat = Math.floor(Math.random() * 50) + 1;

					return Array.from({ length: event.quantity }, (_, index) => ({
						...event,
						ticketId: generateTicketId(),
						section: randSection,
						seat: firstSeat + index,
					}));
				});

				set({
					purchasedTickets: [...get().purchasedTickets, ...purchasedTickets],
					cart: [],
					showConfetti: true,
				});
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				cart: state.cart,
				purchasedTickets: state.purchasedTickets,
			}),
		},
	),
);

export default useCartStore;
