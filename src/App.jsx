// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home/Home.jsx";
import Description from "./pages/Description/Description.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import About from "./pages/About/About.jsx";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchList" element={<WatchList />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}