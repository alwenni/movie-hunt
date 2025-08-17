import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home/Home.jsx";
import Description from "./pages/Description/Description.jsx";
import WatchList from "./pages/WatchList/WatchList.jsx";
import About from "./pages/About/About.jsx";
import { useState } from "react";
export default function App() {
  const [watchList, setWatchList] = useState([]);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/watchList"
          // 👇 comment goes here, outside of JSX props
          element={
            <WatchList
              watchlist={watchList}
              setWatchList={setWatchList}   // pass setter down
            />
          }
        />
        <Route
          path="/description/:imdbID"
          element={<Description watchList={watchList} setWatchList={setWatchList} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
