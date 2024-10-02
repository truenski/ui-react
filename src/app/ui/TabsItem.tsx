import React, { useEffect, useState } from "react";
import TWEEN from "@tweenjs/tween.js";

const TabsItem = ({
  index,
  name,
  count,
  showBadge = true,
  isActive,
  onClick,
}) => {
  const [animatedNumber, setAnimatedNumber] = useState(count);

  useEffect(() => {
    let animationFrame;
    const tweeningNumber = { value: animatedNumber };

    const animate = (time) => {
      TWEEN.update(time);
      animationFrame = requestAnimationFrame(animate);
    };

    const tween = new TWEEN.Tween(tweeningNumber)
      .to({ value: count }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        setAnimatedNumber(tweeningNumber.value.toFixed(0));
      })
      .onComplete(() => {
        cancelAnimationFrame(animationFrame);
      })
      .start();

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      tween.stop();
    };
  }, [count]);

  return (
    <li className={`tabs-title ${isActive ? "is-active" : ""}`}>
      <a onClick={onClick}>
        {name}
        {showBadge && <span className="badge">{animatedNumber}</span>}
      </a>
    </li>
  );
};

export default TabsItem;
