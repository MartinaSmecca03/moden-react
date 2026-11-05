import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 4));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="home">
      <div className="home-banner">
        <div className="home-banner-content">
          <span>MODEN COLLECTION</span>

          <h1>Lo stile che parla di te.</h1>

          <p>
            Scopri la nostra selezione di prodotti e trova
            quelli perfetti per il tuo stile.
          </p>

          <Link to="/catalogo" className="home-button">
            SCOPRI IL CATALOGO
          </Link>
        </div>
      </div>

      <div className="home-products">
        <h2>I nostri prodotti</h2>
        <p>Scopri alcuni dei prodotti selezionati per te.</p>

        {loading ? (
          <p>Caricamento prodotti...</p>
        ) : products.length === 0 ? (
          <p>Non è stato possibile caricare i prodotti.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link to="/catalogo" className="home-button">
          VEDI TUTTI I PRODOTTI
        </Link>
      </div>

      <div className="home-info">
        <h2>Il tuo shopping, in un solo posto.</h2>

        <p>
          Esplora i prodotti, salva i tuoi preferiti
          e completa i tuoi acquisti con facilità.
        </p>
      </div>
    </section>
  );
}

export default Home;