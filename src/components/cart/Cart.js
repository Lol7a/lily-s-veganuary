import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import classes from "./Cart.module.scss";

const Cart = (props) => {
	const ctx = useContext(CartContext);
	const [isOrder, setIsOrder] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
	const hasItems = ctx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		ctx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		ctx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsOrder(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		const response = await fetch(
			"https://lily-s-food-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: ctx.items,
				}),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
		ctx.clearCart();
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{ctx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<Button
				isEmpty={true}
				className={classes["btn--alt"]}
				clickHandler={props.onHideCart}
			>
				Close
			</Button>
			{hasItems && (
				<Button className={classes.btn} clickHandler={orderHandler}>
					Order
				</Button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total amount</span>
				<span>{totalAmount}</span>
			</div>
			{isOrder && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
			)}
			{!isOrder && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<Button clickHandler={props.onHideCart}>Close</Button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClick={props.onHideCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
