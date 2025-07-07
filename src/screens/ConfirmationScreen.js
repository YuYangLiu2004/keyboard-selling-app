import React from 'react';

function ConfirmationScreen({ onSurveySubmit }) {
  return (
    <div className="text-center py-5">
      <i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i>
      <h1 className="mt-3">Thank You For Your Order!</h1>
      <p className="lead">A confirmation email has been sent.</p>
      
      {/* --- NEW Survey Section --- */}
      <div className="card mt-5 mx-auto" style={{maxWidth: '600px'}}>
        <div className="card-body">
          <h5 className="card-title">We value your feedback!</h5>
          <p className="card-text">How was your shopping experience today? Your comments help us improve.</p>
          <form onSubmit={(e) => { e.preventDefault(); onSurveySubmit(); }}>
            <div className="mb-3">
              <textarea className="form-control" rows="3" placeholder="Leave your comments here..."></textarea>
            </div>
            <button type="submit" className="btn btn-secondary">Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationScreen;