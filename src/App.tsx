import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Monthly from "./pages/Monthly/Monthly.tsx";
import Yearly from "./pages/Yearly/Yearly.tsx";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.tsx";
import Create from "./pages/Create/Create.tsx";
import Predict from "./pages/Predict/Predict.tsx";

const App = () => {
  return (
    <Router>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly/:type/:month/:year" element={<Monthly />} />
        <Route path="/yearly/:type/:year" element={<Yearly />} />
        <Route path="/create/:type/:month/:year" element={<Create />} />
        <Route path="/predict/:year" element={<Predict />} />
      </Routes>
    </Router>
  );
};

export default App;
