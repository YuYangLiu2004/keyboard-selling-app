import React from 'react';

function SurveyThanksScreen({ onNavigate }) {
  return (
    <div className="text-center py-5">
      <i className="bi bi-heart-fill text-danger" style={{fontSize: '5rem'}}></i>
      <h1 className="mt-3">Feedback Received!</h1>
      <p className="lead">Thank you for helping us make Key Lair better.</p>
      <button onClick={() => onNavigate('list')} className="btn btn-primary mt-3">Continue Shopping</button>
    </div>
  );
}

export default SurveyThanksScreen;