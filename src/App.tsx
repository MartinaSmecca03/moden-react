import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import "./App.css";
import { ShopProvider } from "./context/ShopContext";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";


function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/prodotto/:id" element={<ProductDetails />} />
            <Route path="/preferiti" element={<Favorites />} />
            <Route path="/carrello" element={<Cart />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/account" element={<Account/>} />
          </Routes>
        </main>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;