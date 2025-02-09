import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RoleSelection from "./components/RoleSelection";
import About from "./components/About";
import Space from "./components/Space"; // Import Space Page
import Ocean from "./components/Ocean";
import Earth from "./components/Earth";
import Learning from './components/Learning';
import Community from './components/Community';
import Contact from './components/Contact';

import "./App.css";

function App() {
  const location = useLocation(); // Get the current route
  const isGamePage = ['/space', '/mining', '/ocean'].includes(location.pathname);

  return (
    <div className="app">
      {/* Hide Header & Hero on the Space page */}
      {!isGamePage && <Header />}
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
              </>
            }
          />
          <Route path="/roles" element={<RoleSelection />} />
          <Route path="/about" element={<About />} />
          <Route path="/space" element={<Space />} /> {/* Space Page */}
          {/* Add other game routes when implemented */}
          <Route path="/mining" element={<Earth />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
