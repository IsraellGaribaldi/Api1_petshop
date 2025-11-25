import Login from "./components/Login";
import Register from "./components/Register";
import PetsPage from "./pages/PetsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pets" element={<PetsPage />} />
      </Routes>
    </Router>
  );
}
