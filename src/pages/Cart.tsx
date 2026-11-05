import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    addOneToCart,
    removeOneFromCart,
    clearCart,
    removeFromCart,
  } = useShop();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <h1>Il tuo carrello</h1>

      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <h2>Totale: {total.toFixed(2)} €</h2>

          <div className="cart-actions">
            <button
              onClick={() => {
                const conferma = window.confirm(
                  "Sei sicuro di voler svuotare il carrello?"
                );

                if (conferma) {
                  clearCart();
                }
              }}
            >
              Svuota carrello
            </button>

            <Link to="/checkout">
              Procedi al checkout
            </Link>
          </div>

          <div className="products-grid">
            {cart.map((item) => (
              <div key={item.product.id} className="product-card">
                <Link to={`/prodotto/${item.product.id}`}>
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                  />
                </Link>

                <h3>
                  <Link to={`/prodotto/${item.product.id}`}>
                    {item.product.title}
                  </Link>
                </h3>

                <strong>{item.product.price.toFixed(2)} €</strong>

                <p>Quantità: {item.quantity}</p>

                <div className="cart-quantity">
                  <button onClick={() => removeOneFromCart(item.product.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => addOneToCart(item.product.id)}>
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    const conferma = window.confirm(
                      "Sei sicuro di voler rimuovere il prodotto dal carrello?"
                    );

                    if (conferma) {
                      removeFromCart(item.product.id);
                    }
                  }}
                >
                  Rimuovi prodotto
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;