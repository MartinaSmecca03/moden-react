import type { Product } from "../types/Product";

export async function getProducts() : Promise<Product[]> {
    const response = await fetch ("https://dummyjson.com/products?limit=100");

    if (!response.ok) {
        throw new Error ("Errore nel recupero dei prodotti");
    }

    const data = await response.json();

    return data.products;
}

export async function getProduct( id : number): Promise<Product> {
    const response = await fetch (`https://dummyjson.com/products/${id}`);

    if(!response.ok) {
        throw new Error ("Prodotto non trovato");
    }

    return response.json();
}  