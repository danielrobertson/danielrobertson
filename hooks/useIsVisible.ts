import { useRef } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

function useIsVisible() {
  const ref = useRef();
  const observer = useIntersectionObserver(ref, {});
  const isVisible = !!observer?.isIntersecting;

  return [ref, isVisible];
}

export default useIsVisible;
