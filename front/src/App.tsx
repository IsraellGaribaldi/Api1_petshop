import Login from "./components/Login";
import Register from "./components/Register";
import PetsPage from "./pages/PetsPage";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pets" element={<PetsPage />} />
    </Routes>
  );
}
