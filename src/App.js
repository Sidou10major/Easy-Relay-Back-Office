import { BrowserRouter, Route, Routes } from "react-router-dom";
import Commandes from "./pages/Commandes/Commandes";
import LayoutVendeur from "./Layouts/LayoutVendeur";
import Paiement from "./pages/Paiements/Paiement";
import Stock from "./pages/Stock/Stock";
import Profile from "./pages/Profile/Profile";
import "./index.css";
import Login from "./pages/Login/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vendeur" element={<LayoutVendeur />}>
          <Route index element={<Commandes />} />
          <Route path="paiement" element={<Paiement />} />
          <Route path="Stock" element={<Stock />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
