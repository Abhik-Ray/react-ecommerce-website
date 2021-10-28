import { configureStore } from "@reduxjs/toolkit";
import cart_slice from "./cart-slice";
import ui_slice from "./ui-slice";
const store = configureStore({
	reducer: {
		ui: ui_slice.reducer,
		cart: cart_slice.reducer,
	},
});
export default store;
