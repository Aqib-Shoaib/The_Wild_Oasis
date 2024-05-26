import { useEffect, useRef } from "react";

/* eslint-disable no-unused-vars */
function useOutSideClick(close, listener = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          //   console.log("click_outside");
          close();
        }
      }
      //the third argument here is of event bubbling concept
      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [close, listener]
  );
  return ref;
}

export default useOutSideClick;
