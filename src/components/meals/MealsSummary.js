import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import Anim from "../anim/Anim";

import classes from "./MealsSummary.module.scss";

const MealsSummary = () => {
	const mealSummary = useRef();

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to("[data-animate='appear']", {
				yPercent: -50,
				opacity: 1,
				duration: 1,
				ease: "back.out(1.7)",
			});
		}, mealSummary);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={mealSummary}>
			<Anim className={classes.summary} anim="appear">
				<h2>Delicious Vegan Food, Delivered To You</h2>
				<p>
					Choose your favorite meal from our broad selection of available meals
					and enjoy a delicious lunch or dinner at home.
				</p>
				<p>
					All our meals are cooked with high-quality ingredients, just-in-time
					and of course by experienced chefs!
				</p>
			</Anim>
		</section>
	);
};

export default MealsSummary;
