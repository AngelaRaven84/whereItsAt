import { create } from 'zustand';

const useCartStore = create((set, get) => ({
	cart: [],
	purchasedTickets: [],

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
				cart: [...cart, { ...event, quantity: 1 }],
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
		const orderNumber = crypto.randomUUID();

		const tickets = get().cart.map((item) => ({
			...item,
			ticketId: crypto.randomUUID(),
			orderNumber,
		}));

		set({
			purchasedTickets: tickets,
			cart: [],
		});
	},
}));

export default useCartStore;
