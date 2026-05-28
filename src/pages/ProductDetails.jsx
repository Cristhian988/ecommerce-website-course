import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      const foundProduct = await getProductById(id);

      if (isMounted) {
        if (!foundProduct) {
          navigate("/");
          return;
        } else {
          setProduct(foundProduct);
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  const productInCart = cartItems.find((item) => item.id === product.id);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
