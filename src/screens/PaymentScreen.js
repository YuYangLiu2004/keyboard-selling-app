import React, { useState } from 'react';

function PaymentScreen({ totalPrice, onProcessPayment }) {
  const [formData, setFormData] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    // Card Number Validation
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }
    // CVV Validation
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits.';
    }
    // Expiry Date Validation
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Expiry date must be in MM/YY format.';
    } else {
      const [month, year] = formData.expiry.split('/');
      const expiryDate = new Date(`20${year}`, month - 1);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (expiryDate < today) {
        newErrors.expiry = 'Card has expired.';
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onProcessPayment(); // Only proceed if there are no errors
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Payment Information</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input type="text" id="cardNumber" className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} placeholder="**** **** **** ****" value={formData.cardNumber} onChange={handleChange} />
                {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiry" className="form-label">Expiry Date</label>
                  <input type="text" id="expiry" className={`form-control ${errors.expiry ? 'is-invalid' : ''}`} placeholder="MM/YY" value={formData.expiry} onChange={handleChange} />
                  {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input type="text" id="cvv" className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} placeholder="123" value={formData.cvv} onChange={handleChange} />
                  {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">Pay Now (${totalPrice.toFixed(2)})</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentScreen;