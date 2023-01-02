import classes from "./Button.module.scss";

const Button = (props) => {
	return (
		<button
			id={props.id}
			type={props.type || "button"}
			className={`${classes.btn} ${
				props.isEmpty ? classes["btn__empty"] : classes["btn__solid"]
			} ${props.className}`}
			onClick={props.clickHandler}
			disabled={props.isDisabled}
		>
			{props.children}
		</button>
	);
};

Button.defaultProps = {
	type: "button",
	disabled: false,
};

export default Button;
