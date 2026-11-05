import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/Product";

interface CartItem {
    product: Product;
    quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  addOneToCart: (productId: number) => void;
  removeOneFromCart: (productId: number) => void;
  clearCart: () => void;
  removeFromCart:(productId: number) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("moden-cart");

    if(!saved) return [];

    let parsed: (Product | CartItem)[];

    try{
        parsed = JSON.parse(saved);
    } catch {
        return[];
    }

    return parsed.map((item: Product | CartItem) =>
        "product" in item
            ? item
            : { product: item, quantity: 1 }
    );
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("moden-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moden-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("moden-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToCart(product: Product) {
    setCart((current) => {
        const existingProduct = current.find(
            (item) => item.product.id === product.id
        );
      if (existingProduct) {
        return current.map((item) =>
        item.product.id === product.id
            ? { ...item, quantity: item.quantity +1 }
            : item
        );
      }
      return [...current, { product, quantity: 1}];
    });
  }

  function addOneToCart (productId: number) {
    setCart ((current) =>
        current.map ((item)=>
            item.product.id === productId
                ? {...item, quantity: item.quantity + 1 }
                : item 
        )
    );
  }

  function removeOneFromCart (productId: number) {
    setCart((current) =>
        current
            .map((item) =>
                item.product.id === productId
                    ? {...item, quantity: item.quantity - 1}
                    : item 
            )
            .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }
  
  function removeFromCart (productId: number) {
    setCart((current) => 
        current.filter((item) => item.product.id !== productId)
    );
  }

  function toggleFavorite(product: Product) {
    setFavorites((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current.filter((item) => item.id !== product.id);
      }
      return [...current, product];
    });
  }

  return (
    <ShopContext.Provider
        value= {{ 
            cart,
            favorites, 
            addToCart, 
            toggleFavorite,
            addOneToCart,
            removeOneFromCart,
            clearCart,
            removeFromCart
        }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop deve essere usato dentro ShopProvider");
  }

  return context;
}