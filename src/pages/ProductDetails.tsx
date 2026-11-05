import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { getProduct } from "../api/products";
import { useShop } from "../context/ShopContext";

function ProductDetails (){
    const { id } = useParams();

    const { addToCart, toggleFavorite, favorites } = useShop();

    const [product, setProduct] = useState<Product | null> (null);
    const [loading, setLoading] = useState(true);

    const isFavorite = product  
        ? favorites.some((item) => item.id === product.id)
        : false;

    useEffect(() => {
        async function loadProduct() {
            try{
                const data = await getProduct(Number(id));
                setProduct(data);
            } catch {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (loading) return <p>Caricamento prodotto..</p>;
    if(!product) return <p>Prodotto non trovato.</p>;

    return (
        <section>
            <h1>{product.title}</h1>
            <img src={product.thumbnail} alt= {product.title} />
            <p>{product.description}</p>
            <strong>{product.price.toFixed(2)} €</strong>
            <p>Categoria: {product.category}</p>
            <p>Valutazione: ★ {product.rating}</p>
            <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
            </button>
            <button onClick={() => toggleFavorite(product)}>
                {isFavorite? "♥ Rimuovi dai preferiti" : "♡ Aggiungi ai preferiti"}
            </button>
        </section>
    );

}

export default ProductDetails;

