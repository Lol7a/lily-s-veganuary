import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

import classes from "./MealItem.module.scss";

const MealItem = (props) => {
	const ctx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		ctx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<p className={classes.description}>{props.description}</p>
				<span className={classes.price}>{price}</span>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} id={props.id} />
			</div>
		</li>
	);
};

export default MealItem;
