import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";
import { ui_actions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const total_cart = useSelector((state) => state.cart.total);
	function toggleCartHandler() {
		dispatch(ui_actions.toggleUI());
	}
	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{total_cart}</span>
		</button>
	);
};

export default CartButton;
