import { useEffect, useRef } from "react";

export function useOutSide(handler, listenCapturing = true) {
  const ref = useRef();

   useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      window.addEventListener("click", handleClick, listenCapturing);

      return () => removeEventListener("click", handleClick);
    },
    [handler, listenCapturing]
  );

  return { ref };
}
