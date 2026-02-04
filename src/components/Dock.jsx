import { dockApps } from "#constants/index";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { gsap } from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {
  const dockRef = useRef(null);
  const { openWindow, closeWindow,windows } = useWindowStore();

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcon = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((element) => {
        const { left: iconLeft, width } = element.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.7) / 20000);

        gsap.to(element, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.25,
          ease: "power1.out",
        });
      });
    };
    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcon(e.clientX - left);
    };
    const handleMouseLeave = () => {
      icons.forEach((element) => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const toggleApp = (app) => {
    if(!app.canOpen) return;

    const win=windows[app.id];

    if (win.isOpen) {
        closeWindow(app.id);
  } else {
        openWindow(app.id)}

        console.log(windows);
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex  justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
