import { useMemo } from "react";
import { useTransform, motion, useSpring } from "framer-motion";

const ImageIndexWithTransform = 2;

interface IScrollMotionItemProps {
  yProgress: any;
  data: {
    color: string;
    title: string;
    background: string;
  };
  index: number;
  length: number;
}

const ScrollMotionItem = (props: IScrollMotionItemProps) => {
  const { yProgress, data, index, length } = props;

  const startIndex = useMemo(() => {
    if (index === 0) {
      return 1;
    }
    return 0;
  }, [index]);

  const endIndex = useMemo(() => {
    if (index === ImageIndexWithTransform - 1 || index === length - 1) {
      return 1;
    }
    return 0;
  }, [index, length]);

  const imageOpacity = useTransform(
    yProgress,
    [index * 100, index * 100 + 20, index * 100 + 50, index * 100 + 100],
    [startIndex, 1, 1, endIndex]
  );

  const imageSpring = useSpring(imageOpacity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const imageTransformY = useTransform(
    yProgress,
    [index * 100 - 80, index * 100 + 30, index * 100 + 50, index * 100 + 100],
    ["100%", "0%", "0%", "100%"]
  );

  return (
    <motion.div
      style={{
        backgroundImage: `url(${data.background})`,
        color: data.color,
        opacity: index !== ImageIndexWithTransform ? imageSpring : undefined,
        translateY:
          index === ImageIndexWithTransform ? imageTransformY : undefined,
      }}
      className="scroll-item"
    >
      <h4>{data.title}</h4>
    </motion.div>
  );
};

export default ScrollMotionItem;
