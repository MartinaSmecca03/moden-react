import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

function Favorites(){
    const { favorites, toggleFavorite,addToCart } = useShop();
    return(
        <section>
            <h1>I tuoi preferiti</h1>

            {favorites.length === 0 ? (
                <p>Non hai ancora aggiunto preferiti.</p>
            ) : (
                <div className="products-grid">
                    {favorites.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/prodotto/${product.id}`}>
                                <img src={product.thumbnail} alt={product.title} />
                            </Link>

                            <h3>
                                <Link to={`/prodotto/${product.id}`}>
                                    {product.title}
                                </Link>
                            </h3>

                            <strong>{product.price.toFixed(2)} €</strong>

                            <button onClick={() => addToCart(product)}>
                                Aggiungi al carrello
                            </button>

                            <button onClick={() => toggleFavorite(product)}>
                                ♥️ Rimuovi dai preferiti
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Favorites;