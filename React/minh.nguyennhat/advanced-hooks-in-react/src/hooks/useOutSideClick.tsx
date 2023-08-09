/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export default useOutsideClick;
