import type { Product } from "../types/Product";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useShop();

  const isFavorite = favorites.some((items) => items.id === product.id);

  return (
    <article className="product-card">
      <Link to={`/prodotto/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <span className="product-category">
        {product.category}
      </span>

      <h3>
        <Link to={`/prodotto/${product.id}`}>
          {product.title}
        </Link>
      </h3>

      <p className="product-description">
        {product.description}
      </p>

      <div className="product-bottom">
        <strong>{product.price.toFixed(2)} €</strong>
        <span>★ {product.rating}</span>
      </div>

      <button 
        className="add-button"
        onClick={() => addToCart(product)}
      >
        Aggiungi al carrello
      </button>
      <button onClick={() => toggleFavorite(product)}>
        {isFavorite? "\u2665 Rimuovi dai preferiti" : " \u2661 Aggiungi ai preferiti"}
      </button>
    </article>
  );
}

export default ProductCard;