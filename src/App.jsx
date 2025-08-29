import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Hunters from "./pages/Hunters";
import Guilds from "./pages/Guilds";
import Dungeons from "./pages/Dungeons";
import Raids from "./pages/Raids";
import RaidParticipations from "./pages/RaidParticipations";
import "./css/App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hunters" element={<Hunters />} />
        <Route path="guilds" element={<Guilds />} />
        <Route path="dungeons" element={<Dungeons />} />
        <Route path="raids" element={<Raids />} />
        <Route path="raid-participations" element={<RaidParticipations />} />
      </Route>
    </Routes>
  );
}
