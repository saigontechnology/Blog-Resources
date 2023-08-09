/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useLayoutEffect } from "react";

const ResizablePanel = () => {
  const [width, setWidth] = useState(0);
  const panelRef = useRef<any>(null);

  // This effect will run after rendering and measure the width of the panel
  useLayoutEffect(() => {
    if (panelRef.current) {
      setWidth(panelRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="panel" ref={panelRef}>
      <h2>Resizable Panel</h2>
      <p>Current width: {width}px</p>
    </div>
  );
};

export default ResizablePanel;
