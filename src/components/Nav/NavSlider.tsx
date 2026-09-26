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
      className="absolute bg-raised rounded-full z-[-1] shadow-[0_0_0_1px_var(--line),0_1px_2px_rgb(23_22_26/0.08)]"
      style={styles}
    />
  );
};

export default NavSlider;
