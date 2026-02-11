"use client";

import { useSpring, animated, config } from "@react-spring/web";

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

  const AnimatedDiv = animated.div as any;

  return (
    <AnimatedDiv
      className="absolute bg-white dark:bg-gray-600 rounded-full z-[-1]"
      style={styles}
    />
  );
};

export default NavSlider;
