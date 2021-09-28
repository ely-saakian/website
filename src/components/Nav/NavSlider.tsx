import { useSpring, animated, config } from "react-spring";

export type TabSliderStyles = {
	height: number;
	width: number;
	left: number;
};

const NavSlider = ({ sliderStyles }: { sliderStyles?: TabSliderStyles }) => {
	const styles = useSpring({
		height: sliderStyles?.height + "px",
		width: sliderStyles?.width + "px",
		left: sliderStyles?.left + "px",
		config: { ...config.stiff, velocity: 0.006 },
	});

	return (
		<animated.div className="absolute bg-white dark:bg-gray-600 rounded-full z-[-1]" style={styles}></animated.div>
	);
};

export default NavSlider;
