import { motion as Motion, useReducedMotion } from "motion/react";

export default function Reveal({ delay = 0, className, children }) {
  const reduce = useReducedMotion();

  return (
    <Motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.div>
  );
}
