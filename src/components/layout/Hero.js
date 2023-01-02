import { Fragment } from "react";
import MealsSummary from "../meals/MealsSummary";

import classes from "./Hero.module.scss";
import mealsImage from "../../assets/ella-olsson-2IxTgsgFi-s-unsplash.jpg";

const Hero = (props) => {
	return (
		<section className={classes.hero}>
			<div className={classes["hero-image"]}>
				<img src={mealsImage} alt="A table full of delicious vegan food!" />
			</div>

			<MealsSummary />
		</section>
	);
};

export default Hero;
