import { useContext, useEffect, useState } from "react";
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.scss";

const HeaderCartButton = (props) => {
	const [btnAnim, setBtnAnim] = useState(false);
	const ctx = useContext(CartContext);
	const { items } = ctx;

	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnAnim ? classes.bump : ""}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnAnim(true);

		const timer = setTimeout(() => {
			setBtnAnim(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
