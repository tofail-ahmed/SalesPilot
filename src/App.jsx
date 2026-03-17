import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SellerProductPage from "./component/SellerProductPage"; // <-- make sure path is correct

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/seller-products">Seller Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller-products" element={<SellerProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;