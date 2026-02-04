import { use } from "react";
import useWindowStore from "src/store/window";
const WindowsWrapper = (component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex: zIndex }}
      className="absolute ">
        <component {...props} />
        
      </section>
    );
  };

  Wrapped.displayName = `withWindowWrapper(${component.displayName || component.name || 'Component'})`;
  return Wrapped;
};

export default WindowsWrapper;
