import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import MealItem from "./MealItem";
import Card from "../ui/Card";

import classes from "./AvailableMeals.module.scss";
import Anim from "../anim/Anim";

const AvailableMeals = () => {
	const availableMeals = useRef();
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://lily-s-food-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	useLayoutEffect(() => {
		if (isLoading) return;

		const ctx = gsap.context(() => {
			gsap.from("[data-animate='appear']", {
				y: "3rem",
				opacity: 0,
				duration: 1,
				ease: "back.out(1.7)",
			});
		}, availableMeals);

		return () => ctx.revert();
	}, [isLoading]);

	if (isLoading) {
		return (
			<section className={classes["meals-loading"]}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes["meals-error"]}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals} ref={availableMeals}>
			<Anim anim="appear">
				<Card className={classes["meals--card"]}>
					<ul>{mealsList}</ul>
				</Card>
			</Anim>
		</section>
	);
};

export default AvailableMeals;
