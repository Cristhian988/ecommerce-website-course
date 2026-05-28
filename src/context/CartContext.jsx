import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id: 2, quantity: 7}

  function addToCart(productId) {
    const existing = cartItems.find((item) => item.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updateCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setCartItems(updateCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { id: productId, quantity } : item,
      ),
    );
  }

  function getCartTotal() {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? item.quantity * product.price : 0);
    }, 0);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
