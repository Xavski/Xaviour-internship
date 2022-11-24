import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#808080" highlightColor="#b3b3b3">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
