import { create } from 'zustand';

const useCartStore = create((set) => ({
	cart: [],

	addToCart: (event) =>
		set((state) => ({
			cart: [...state.cart, event],
		})),

	removeFromCart: (id) =>
		set((state) => ({
			cart: state.cart.filter((event) => event.id !== id),
		})),

	clearCart: () =>
		set({
			cart: [],
		}),
}));

export default useCartStore;
