import { useState } from "react";

import {
  SVGFieldComponent,
  ReversedTurtleComponent,
  getLengthByXY,
  getAngleByXY,
} from "./SVGComponents";

const App = () => {
  const angle = 0;
  const [angleValue, setAngleValue] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);

  const getAngle = (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const angle = getAngleByXY(300, 300, cursorX, cursorY);
    if (cursorX >= 300) {
      setAngleValue(angle);
    } else {
      setAngleValue(360 - angle);
    }
  };

  return (
    <div onMouseDown={getAngle}>
      <SVGFieldComponent
        width="600px"
        height="600px"
        backgroundColor="rgb(240, 230, 250)"
      >
        <ReversedTurtleComponent
          x={300}
          y={300}
          turn={0}
          backgroundColor={"red"}
          borderColor={"blue"}
        />
      </SVGFieldComponent>
      {angleValue}
    </div>
  );
};

export { App };

/**
 <LineComponent
    points={[100, 0, 100, 100]}
    backgroundColor="blue"
    borderColor="red"
  />

  <LineComponent
    points={[0, 200, 100 * sinFunc(angle), 200 + 100 * cosFunc(angle)]}
    backgroundColor="blue"
    borderColor="red"
  />
 */
