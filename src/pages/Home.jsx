import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">
          ShopHub is a simple e-commerce website built using React.js and
          Tailwind CSS. It allows you to browse and purchase products from a
          variety of categories.
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {getProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
