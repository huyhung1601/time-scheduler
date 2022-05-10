import { useEffect, useRef } from "react";

const useClickOutside = (handler: any) => {
  const domNode = useRef<any>();
  useEffect(() => {
    const maybeHandler = (e: any) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);
  return domNode;
};

export default useClickOutside;
