import { useEffect } from "react";

export const useOnKeyEnter = (callback, targetkey) => {
  useEffect(() => {
    const keyPressHandler = (event) => {
      if (event.key === targetkey) {
        callback();
      }
    };
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [callback, targetkey]);
};
