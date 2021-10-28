import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ui_actions } from "./store/ui-slice";
import Notification from "./components/UI/notification";
import { cart_actions } from "./store/cart-slice";

let isInitial = true;
// Root Component
function App() {
	const dispatch = useDispatch(); //Used to dispatch funtions to be called

	//Selects values from State slices to be used
	const cartVisibilityState = useSelector((state) => state.ui.cartVisibility); // cartVisibility toggles cart component
	const cart = useSelector((state) => state.cart); // cart contains list of items in cart; {items: [], total: x}
	const notification = useSelector((state) => state.ui.notification); //notification bar present on top of screen

	//Hook called on change in cart
	useEffect(() => {
		//Syncs cart data to database
		const sendCartData = async () => {
			dispatch(
				ui_actions.showNotification({
					status: "pending",
					title: "Sending...",
					message: "Sending cart data",
				})
			);
			const response = await fetch(
				"https://react-sample-database-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
				{ method: "PUT", body: JSON.stringify(cart) }
			);
			if (!response.ok) {
				throw new Error("Sending Cart Data Failed!");
			}
			dispatch(
				ui_actions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully",
				})
			);
		};

		//Special case when application loads for the first time; Is taken advantage of to recieve initial cart value from database
		if (isInitial) {
			isInitial = false;
			const replaceCartItem = async () => {
				dispatch(
					ui_actions.showNotification({
						status: "pending",
						title: "Sending...",
						message: "Recieving initial data",
					})
				);
				const response = await fetch(
					"https://react-sample-database-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
				);
				if (!response.ok) {
					throw new Error("Recieving Cart Data Failed!");
				}
				if (response != null) {
					const data = await response.json();
					dispatch(cart_actions.replaceCart(data));
				}
			};
			//calls the async function to get databse items
			replaceCartItem().catch((error) => {
				dispatch(
					ui_actions.showNotification({
						status: "error",
						title: "Error!",
						message: "Recieving cart data failed",
					})
				);
			});
			return; //returns case
		}
		//calls the function to sync local to database
		sendCartData().catch((error) => {
			dispatch(
				ui_actions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed successfully",
				})
			);
		});
	}, [cart, dispatch]);
	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{cartVisibilityState && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
