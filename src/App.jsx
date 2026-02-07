import React from "react";
import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/welcome.jsx";
import Dock from "#components/Dock.jsx";
import { Terminal } from "#windows";
import { gsap } from "gsap";

import { Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
};
export default App;
