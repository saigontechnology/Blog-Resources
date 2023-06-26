import React from "react";
import "./App.css";
import CompoundComponent from "./components/CompoundComponent";
import Mouse from "./components/Mouse";
import AuthenticatedComponent from "./components/withAuth";

const App = () => {
  return (
    <div>
      <h1>Mouse position:</h1>
      <Mouse
        render={(mouse: { x: number; y: number }) => (
          <p>
            X: {mouse.x}, Y: {mouse.y}
          </p>
        )}
      />

      <div>
        <AuthenticatedComponent />
      </div>
      <div>
        <CompoundComponent />
      </div>
    </div>
  );
};

export default App;
