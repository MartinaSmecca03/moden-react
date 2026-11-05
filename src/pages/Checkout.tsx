import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useShop();


  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section>
        <h1>Il carrello è vuoto</h1>
        <Link to="/catalogo">Torna al catalogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Completa il tuo ordine</h1>
      <h2>Dati di spedizione</h2>
        <form
        onSubmit={(event) => {
            event.preventDefault();

            const conferma = window.confirm(
                "Sei sicuro di voler procedere all'acquisto?"
            );

            if (conferma) {
                const formData = new FormData(event.currentTarget);

                const userData = {
                nome: String(formData.get("nome")),
                cognome: String(formData.get("cognome")),
                email: String(formData.get("email")),
                indirizzo: String(formData.get("indirizzo")),
                citta: String(formData.get("citta")),
                cap: String(formData.get("cap")),
            };

                localStorage.setItem("moden-user", JSON.stringify(userData));

                clearCart();

                alert("Ordine effettuato con successo!");
            }
        }}
        >
        <input
            type="text"
            name="nome"
            placeholder="Nome"
            required
        />

        <input
            type="text"
            name="cognome"
            placeholder="Cognome"
            required
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            required
        />

        <input
            type="text"
            name="indirizzo"
            placeholder="Indirizzo"
            required
        />

        <input
            type="text"
            name="citta"
            placeholder="Città"
            required
        />

        <input
            type="text"
            name="cap"
            placeholder="CAP"
            required
        />
        
        <button type="submit">
            Conferma ordine
        </button>

        </form>
      



      <h2>Riepilogo ordine</h2>

      {cart.map((item) => (
        <div key={item.product.id}>
          <p>{item.product.title}</p>
          <p>Quantità: {item.quantity}</p>
          <p>
            {(item.product.price * item.quantity).toFixed(2)} €
          </p>
        </div>
      ))}

      <h2>Totale: {total.toFixed(2)} €</h2>
    </section>
  );
}

export default Checkout;