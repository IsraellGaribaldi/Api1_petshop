import Login from "./components/Login";
import Register from "./components/Register";
import PetsPage from "./pages/PetsPage";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pets" element={<PetsPage />} />
    </Routes>
  );
}
