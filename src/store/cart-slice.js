import { createSlice } from "@reduxjs/toolkit";

const cart_slice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		total: 0,
	},
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existingItems = state.items.find((item) => item.id === newItem.id);
			state.total++;
			if (!existingItems) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					title: newItem.title,
				});
			} else {
				existingItems.quantity++;
				existingItems.totalPrice += newItem.price;
			}
		},
		removeItem(state, action) {
			const id = action.payload;
			const existingItems = state.items.find((item) => item.id === id);
			state.total--;
			if (existingItems.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItems.quantity--;
				existingItems.totalPrice -= existingItems.price;
			}
		},
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.total = action.payload.total;
		},
	},
});

export default cart_slice;
export const cart_actions = cart_slice.actions;
