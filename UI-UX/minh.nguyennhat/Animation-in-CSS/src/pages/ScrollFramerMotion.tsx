import { useRef } from "react";
import { useScroll, motion, MotionValue, useTransform } from "framer-motion";

import "../styles/scrollFramerMotion.style.css";
import ScrollMotionItem from "../components/ScrollMotionItem";
import Background1 from "../assets/images/background1.avif";
import Background2 from "../assets/images/background2.avif";
import Background3 from "../assets/images/background3.avif";
import Background4 from "../assets/images/background4.avif";
import Background5 from "../assets/images/background5.avif";

const scrollData = [
  {
    color: "red",
    title: "Item 1",
    background: Background1,
  },
  {
    color: "blue",
    title: "Item 2",
    background: Background2,
  },
  {
    color: "green",
    title: "Item 3",
    background: Background3,
  },
  {
    color: "orange",
    title: "Item 4",
    background: Background4,
  },
  {
    color: "purple",
    title: "Item 5",
    background: Background5,
  },
];

const HEIGHT = 500;

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

const ScrollFramerMotion = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useParallax(scrollYProgress, HEIGHT);

  return (
    <div className="scroll-container" ref={containerRef}>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <h1>Scroll Framer-Motion</h1>
      <div className="wrap-scroll-content">
        <div className="wrap-list-scroll">
          {scrollData.map((item, index) => (
            <ScrollMotionItem
              key={index}
              data={item}
              yProgress={y}
              index={index}
              length={scrollData.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollFramerMotion;
