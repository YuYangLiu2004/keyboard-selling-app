import React from 'react';

function CartScreen({ cartItems, onRemove, onNavigate }) {
  // This reduce function now checks if an item is wireless and applies the discount
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.wireless ? item.price * 0.85 : item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div>
      <h1 className="mb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => {
            // Calculate the price for this specific item, applying discount if needed
            const itemPrice = item.wireless ? item.price * 0.85 : item.price;
            const itemTotalPrice = itemPrice * item.quantity;

            return (
              <div key={item.id} className="card mb-3 cart-item">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} className="me-3" />
                    <div>
                      <h5 className="mb-0">{item.name}</h5>
                      <p className="mb-0 text-muted">Quantity: {item.quantity}</p>
                      {item.wireless && <small className="text-danger">15% discount applied!</small>}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 fs-5 me-4">${itemTotalPrice.toFixed(2)}</p>
                    <button onClick={() => onRemove(item.id)} className="btn btn-outline-danger btn-sm">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-end mt-4">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button onClick={() => onNavigate('payment')} className="btn btn-primary btn-lg mt-2">Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartScreen;