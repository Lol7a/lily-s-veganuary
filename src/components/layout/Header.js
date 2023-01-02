import { Fragment, useState, useEffect } from "react";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.scss";
// import mealsImage from "../../assets/ella-olsson-2IxTgsgFi-s-unsplash.jpg";

const Header = (props) => {
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlHeader = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > lastScrollY) {
				setShow(false);
			} else {
				setShow(true);
			}

			setLastScrollY(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlHeader);

			return () => {
				window.removeEventListener("scroll", controlHeader);
			};
		}
	}, [lastScrollY]);

	return (
		<Fragment>
			<header className={`${classes.header}  ${!show && classes.hidden}`}>
				<h1>Lily's Veganuary</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>

			{/* <div className={classes["main-image"]}>
				<img src={mealsImage} alt="A table full of delicious vegan food!" />
			</div> */}
		</Fragment>
	);
};

export default Header;
