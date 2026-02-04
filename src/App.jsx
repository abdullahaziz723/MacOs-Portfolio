import React from 'react';
import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/welcome.jsx";
import Dock from "#components/Dock.jsx";
import { gsap } from 'gsap';

import { Draggable } from 'gsap/all';
gsap.registerPlugin(Draggable);
const App = () => {
    return (<main>
            <Navbar/>
            <Welcome/>
            <Dock/>


        </main>
    )
}
export default App;