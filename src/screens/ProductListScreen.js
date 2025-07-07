import React, { useState, useMemo } from 'react';

function ProductListScreen({ products, onAddToCart, onNavigate }) {
  const [filters, setFilters] = useState({ color: 'all', switchType: 'all', rgb: 'all', wireless: 'all', size: 'all' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.color !== 'all' && p.color !== filters.color) return false;
      if (filters.switchType !== 'all' && p.switchType !== filters.switchType) return false;
      if (filters.rgb !== 'all' && p.rgb !== (filters.rgb === 'true')) return false;
      if (filters.wireless !== 'all' && p.wireless !== (filters.wireless === 'true')) return false;
      if (filters.size !== 'all' && p.size !== parseInt(filters.size, 10)) return false;
      return true;
    });
  }, [products, filters]);

  return (
    <div>
      <div className="alert alert-info text-center" role="alert">
        <h4 className="alert-heading">Limited Time Offer!</h4>
        <p>Get <strong>15% OFF</strong> all wireless keyboards this week. The perfect time to upgrade your setup!</p>
      </div>

      <h1 className="mb-4">Our Collection</h1>
      <div className="row g-2 mb-4 p-3 bg-light border rounded">
        <div className="col-sm-6 col-md-4 col-lg"><select name="color" className="form-select" onChange={handleFilterChange}><option value="all">All Colors</option><option value="Black">Black</option><option value="White">White</option><option value="Silver">Silver</option><option value="Beige">Beige</option><option value="Pink">Pink</option></select></div>
        <div className="col-sm-6 col-md-4 col-lg"><select name="switchType" className="form-select" onChange={handleFilterChange}><option value="all">All Switch Types</option><option value="Linear">Linear</option><option value="Tactile">Tactile</option><option value="Clicky">Clicky</option></select></div>
        <div className="col-sm-6 col-md-4 col-lg"><select name="rgb" className="form-select" onChange={handleFilterChange}><option value="all">Any RGB</option><option value="true">RGB</option><option value="false">No RGB</option></select></div>
        <div className="col-sm-6 col-md-4 col-lg"><select name="wireless" className="form-select" onChange={handleFilterChange}><option value="all">Any Connection</option><option value="true">Wireless</option><option value="false">Wired</option></select></div>
        <div className="col-sm-12 col-md-4 col-lg"><select name="size" className="form-select" onChange={handleFilterChange}><option value="all">All Sizes</option><option value="60">60%</option><option value="65">65%</option><option value="75">75%</option><option value="80">TKL (80%)</option><option value="100">Full-size (100%)</option></select></div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {filteredProducts.map(product => {
          const isOnSale = product.wireless;
          const salePrice = product.price * 0.85;

          return (
            <div key={product.id} className="col">
              <div className="card h-100 product-card position-relative">
                {/* Sale Badge for Wireless Keyboards */}
                {isOnSale && (
                  <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '90%', top: '10px' }}>
                    15% OFF
                  </span>
                )}
                <img src={product.image} className="card-img-top" alt={product.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  {/* Price Display Logic */}
                  <div className="d-flex align-items-center">
                    {isOnSale ? (
                      <>
                        <p className="fs-4 fw-bold text-danger me-2 mb-0">${salePrice.toFixed(2)}</p>
                        <p className="text-muted text-decoration-line-through mb-0">${product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="fs-4 fw-bold mb-0">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                  <div className="mt-auto pt-3">
                    <button onClick={() => onAddToCart(product)} className="btn btn-primary w-100 mb-2">Add to Cart</button>
                    <button onClick={() => onNavigate('detail', product.id)} className="btn btn-outline-secondary w-100">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredProducts.length === 0 && <p className="text-center mt-4">No keyboards match your current filters.</p>}
    </div>
  );
}
export default ProductListScreen;