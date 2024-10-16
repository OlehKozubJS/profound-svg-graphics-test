import { useEffect, useState } from "react";

import { getAngleByXY, getXYbyAngle } from "./angleFunctions";

import { LineComponent } from "./LineComponent";

const ArrowComponent = ({ x, y, onTurn, backgroundColor, borderColor }) => {
  const [angleValue, setAngleValue] = useState(0);
  const [initialAngle, setInitialAngle] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);

  const getQuantalAngle = (angle, step) => {
    return Math.round(angle / step) * step;
  };

  const calculateCurrentAngle = (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    let angle = getAngleByXY(x, y, cursorX, cursorY);
    if (cursorX < x) {
      angle = 360 - angle;
    }
    return angle;
  };

  const startMoving = (event) => {
    setIsDraggable(true);
    let newInitialAngle = calculateCurrentAngle(event) - angleValue;
    if (newInitialAngle < 0) {
      newInitialAngle += 360;
    }
    setInitialAngle(newInitialAngle);
  };

  const moveTurtle = (event) => {
    event.preventDefault();

    if (isDraggable) {
      let newAngleValue = calculateCurrentAngle(event) - initialAngle;
      if (newAngleValue < 0) {
        newAngleValue += 360;
      }
      setAngleValue(newAngleValue);
    }
  };

  const stopMoving = () => {
    const discretedAngle = Math.round(angleValue / 45) * 45;
    setAngleValue(discretedAngle);
    setIsDraggable(false);
  };

  useEffect(() => {
    onTurn(angleValue);
  }, [angleValue]);

  return (
    <LineComponent
      points={[
        x,
        y,
        ...getXYbyAngle(x, y, 50, angleValue - 25),
        ...getXYbyAngle(x, y, 200, angleValue),
        ...getXYbyAngle(x, y, 50, angleValue + 25),
        x,
        y,
      ]}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onMouseDown={startMoving}
      onMouseMove={moveTurtle}
      onMouseUp={stopMoving}
    />
  );
};

export { ArrowComponent };
