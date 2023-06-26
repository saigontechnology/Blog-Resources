import React, { useState } from "react";

type MouseProps = {
  render: ({ x, y }: { x: number; y: number }) => any;
};

const Mouse: React.FC<MouseProps> = (props) => {
  const { render } = props;

  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: any) => {
    setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return <div onMouseMove={handleMouseMove}>{render(state)}</div>;
};

export default Mouse;
