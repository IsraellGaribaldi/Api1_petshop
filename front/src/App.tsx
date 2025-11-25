import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PetsPage from "./pages/PetsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pets" element={<PetsPage />} />
      </Routes>
    </Router>
  );
}

export default App;