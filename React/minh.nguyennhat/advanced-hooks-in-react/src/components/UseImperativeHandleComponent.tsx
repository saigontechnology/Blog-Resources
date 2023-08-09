/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useImperativeHandle, forwardRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const internalRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    // Expose the custom focus method
    focus: () => {
      if (internalRef.current) {
        internalRef.current.focus();
      }
    },
  }));

  return <input ref={internalRef} />;
});

const ParentComponent = () => {
  const childRef = useRef<any>();

  const handleFocusClick = () => {
    if (childRef.current) {
      childRef.current.focus();
    }
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleFocusClick}>Focus Child Input</button>
    </div>
  );
};

export default ParentComponent;
