import { createSlice } from "@reduxjs/toolkit";
const ui_slice = createSlice({
	name: "ui",
	initialState: { cartVisibility: false, notification: null },
	reducers: {
		toggleUI(state) {
			state.cartVisibility = !state.cartVisibility;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const ui_actions = ui_slice.actions;
export default ui_slice;
