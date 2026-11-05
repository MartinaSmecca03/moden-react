import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Non è stato possibile caricare i prodotti.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "all" || product.category === category
    )
    .sort((a, b) => {
      if (sort === "low-high") {
        return a.price - b.price;
      }

      if (sort === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  if (loading) {
    return <p>Caricamento prodotti...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Il nostro catalogo</h1>

      <p>{filteredProducts.length} prodotti disponibili</p>

      <div className="catalog-controls">
        <input
          type="text"
          placeholder="Cerca un prodotto..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">Tutte le categorie</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">Ordina per...</option>
          <option value="low-high">Prezzo crescente</option>
          <option value="high-low">Prezzo decrescente</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Nessun prodotto trovato.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Catalog;