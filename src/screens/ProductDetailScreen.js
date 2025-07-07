import React from 'react';

function ProductDetailScreen({ product, onAddToCart, onNavigate }) {
  if (!product) return <p>Product not found.</p>;

  const isOnSale = product.wireless;
  const salePrice = product.price * 0.85;

  return (
    <div>
      <button onClick={() => onNavigate('list')} className="btn btn-light mb-4">← Back to Products</button>
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          
          <div className="d-flex align-items-baseline mb-3">
            {isOnSale ? (
              <>
                <p className="fs-2 fw-bold text-danger me-3 mb-0">${salePrice.toFixed(2)}</p>
                <p className="fs-4 text-muted text-decoration-line-through mb-0">${product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="fs-2 fw-bold mb-0">${product.price.toFixed(2)}</p>
            )}
          </div>
          
          <button onClick={() => onAddToCart(product)} className="btn btn-primary btn-lg mb-4">Add to Cart</button>
          
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between"><strong>Color:</strong> <span>{product.color}</span></li>
            <li className="list-group-item d-flex justify-content-between"><strong>Size:</strong> <span>{product.size}%</span></li>
            <li className="list-group-item d-flex justify-content-between"><strong>Switch Type:</strong> <span>{product.switchType}</span></li>
            <li className="list-group-item d-flex justify-content-between"><strong>RGB Backlighting:</strong> <span>{product.rgb ? 'Yes' : 'No'}</span></li>
            <li className="list-group-item d-flex justify-content-between"><strong>Wireless:</strong> <span>{product.wireless ? 'Yes' : 'No'}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailScreen;