import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import PetsPage from "./pages/PetsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
