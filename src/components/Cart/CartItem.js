import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cart_actions } from "../../store/cart-slice";

const CartItem = (props) => {
	const dispatch = useDispatch();
	const { title, quantity, total, price, id } = props.item;
	function removeItemHandler() {
		dispatch(cart_actions.removeItem(id));
	}
	function addItemHandler() {
		dispatch(
			cart_actions.addItem({
				id,
				title,
				price,
			})
		);
	}
	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${total.toFixed(2)}{" "}
					<span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={removeItemHandler}>-</button>
					<button onClick={addItemHandler}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
