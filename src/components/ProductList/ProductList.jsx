import React from 'react';
import './ProductList.css';

// Komponen ProductItem (internal component)
const ProductItem = ({ product, onAddToCart }) => {
  const { id, name, price, category, image, stock } = product;

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt={name} />
        {stock === 0 && <div className="out-of-stock">Habis</div>}
      </div>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <h4 className="product-name">{name}</h4>
        <p className="product-price">Rp {price.toLocaleString('id-ID')}</p>
      </div>

      <button
        className={`add-to-cart-btn ${stock === 0 ? 'disabled' : ''}`}
        onClick={() => onAddToCart(product)}
        disabled={stock === 0}
      >
        {stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
      </button>
    </div>
  );
};

// Komponen ProductList utama
const ProductList = ({ products, onAddToCart }) => {
  // Jika tidak ada products
  if (!products || products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>Tidak ada produk tersedia</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Daftar Produk ({products.length} items)</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;