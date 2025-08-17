import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home/Home.jsx";
import Description from "./pages/Description/Description.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import About from "./pages/About/About.jsx";
import { useState } from "react";
export default function App() {
  const [watchList, setWatchList] = useState([ ]);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* pass prop name that WatchList expects */}
        <Route
          path="/watchList"
          element={<WatchList watchlist={watchList} /* onRemove optional */ />}
        />
        {/* keep param name consistent with Description.jsx (imdbID) */}
        <Route
          path="/description/:imdbID"
          element={<Description watchList={watchList} setWatchList={setWatchList} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}