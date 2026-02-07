import React from "react";
import WindowsWrapper from "#hoc/WindowsWrapper.jsx";
import { techStack } from "#constants/index";
import { Check, Flag } from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
            <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@abdullah % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li  key={category}className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item,i) => (
                    <li key={i}>{item}
                    {i<items.length-1 ? ',' : ''}</li>
                ))}
              </ul>

            </li>
          ))}
        </ul>

        <div className="footnote">
            <p>
                <Check size={20} /> 5 of stacks loaded successfully
            </p>
            <p className="text-block">
                <Flag size={15} fill="black" />
                Render Time :6ms
                
            </p>
        </div>
      </div>
    </>
  );
};

//higher order component to wrap the terminal with window functionalities
//A HOC is a function that takes a component and returns a new component with added functionalities

const WrappedTerminal = WindowsWrapper(Terminal, "terminal");
export default WrappedTerminal;
