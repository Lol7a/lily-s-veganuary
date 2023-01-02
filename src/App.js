import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { gsap } from "gsap";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import CartProvider from "./store/CartProvider";

import Hero from "./components/layout/Hero";

import "./App.scss";

const MouseCircle = forwardRef(({ size, delay }, ref) => {
	const el = useRef();

	useImperativeHandle(
		ref,
		() => {
			// return our API
			return {
				moveTo(x, y) {
					gsap.to(el.current, { x, y, delay });
				},
			};
		},
		[delay]
	);

	return <div className={`circle ${size}`} ref={el}></div>;
});

const App = () => {
	const mouseCircleRefs = useRef([]);
	const [cartIsShown, setCartIsShown] = useState(false);

	mouseCircleRefs.current = [];

	useEffect(() => {
		const { innerWidth, innerHeight } = window;
		mouseCircleRefs.current.forEach((ref) =>
			ref.moveTo(innerWidth / 2, innerHeight / 2)
		);

		const onMove = ({ clientX, clientY }) => {
			mouseCircleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
		};

		window.addEventListener("pointermove", onMove);

		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	const addMouseCircleRef = (ref) => {
		if (ref) {
			mouseCircleRefs.current.push(ref);
		}
	};

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onHideCart={hideCartHandler} />}
			<MouseCircle size="sm" ref={addMouseCircleRef} delay={0} />
			<MouseCircle size="md" ref={addMouseCircleRef} delay={0.1} />
			<Header onShowCart={showCartHandler} />
			<main>
				<Hero />
				<Meals />
			</main>
		</CartProvider>
	);
};

export default App;
