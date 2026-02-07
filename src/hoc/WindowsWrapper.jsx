import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const WindowsWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const element = ref.current;
      if (isOpen || !element) return;

      element.style.display = "block";
    }, [isOpen]);

    useGSAP(() => {
      const element = ref.current;
      if (!element) return;
      const instance = Draggable.create(element, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance[0].kill();
    }, []);

    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
      element.style.display = isOpen ? "block" : "none";

      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `withWindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowsWrapper;
