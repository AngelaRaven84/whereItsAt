import { create } from 'zustand';

const useCartStore = create((set) => ({
	cart: [],

	addToCart: (event) =>
		set((state) => {
			const existingEvent = state.cart.find((item) => item.id === event.id);

			if (existingEvent) {
				return {
					cart: state.cart.map((item) =>
						item.id === event.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				};
			}

			return {
				cart: [...state.cart, { ...event, quantity: 1 }],
			};
		}),

	increaseQuantity: (id) =>
		set((state) => ({
			cart: state.cart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		})),

	decreaseQuantity: (id) =>
		set((state) => ({
			cart: state.cart
				.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
				)
				.filter((item) => item.quantity > 0),
		})),

	removeFromCart: (id) =>
		set((state) => ({
			cart: state.cart.filter((event) => event.id !== id),
		})),

	clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
