import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetsPage from "./pages/PetsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;