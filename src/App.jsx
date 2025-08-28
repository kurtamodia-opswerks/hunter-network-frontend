import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Hunters from "./pages/Hunters";
import Guilds from "./pages/Guilds";
import Dungeons from "./pages/Dungeons";
import "./css/App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hunters" element={<Hunters />} />
        <Route path="guilds" element={<Guilds />} />
        <Route path="dungeons" element={<Dungeons />} />
      </Route>
    </Routes>
  );
}
