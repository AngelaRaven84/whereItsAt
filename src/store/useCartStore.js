import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
				const orderNumber = crypto.randomUUID();

				const tickets = get().cart.flatMap((item) =>
					Array.from({ length: item.quantity }, () => ({
						...item,
						quantity: 1,
						ticketId: crypto.randomUUID(),
						orderNumber,
					})),
				);

				set({
					purchasedTickets: [...get().purchasedTickets, ...tickets],
					cart: [],
				});
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				cart: state.cart,
				PurchasedTickets: state.purchasedTickets,
			}),
		},
	),
);

export default useCartStore;
