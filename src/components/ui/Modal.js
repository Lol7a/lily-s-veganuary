import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

const Backdrop = (props) => {
	return (
		<div
			className={`${classes.backdrop} ${props.className}`}
			onClick={props.onClick}
		></div>
	);
};

const Overlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onClick} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<Overlay>{props.children}</Overlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
