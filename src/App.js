import React, { useState, useEffect } from 'react';
import './App.css';

// Import Components, Screens, and our new Image Loader
import Header from './components/Header';
import Footer from './components/Footer';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import SurveyThanksScreen from './screens/SurveyThanksScreen';
import keyboardImages from './components/imageLoader'; // <-- This now imports your specific images

// --- Mock Product Data using the imported images array ---
const mockProducts = [
  { id: 1, name: 'Aura Glow V2', price: 165, image: keyboardImages[0], description: 'A 75% mechanical keyboard with customizable RGB.', color: 'White', rgb: true, switchType: 'Tactile', wireless: true, size: 75 },
  { id: 2, name: 'Stealth Pro', price: 210, image: keyboardImages[1], description: 'A sleek, minimalist TKL keyboard for performance.', color: 'Black', rgb: false, switchType: 'Linear', wireless: false, size: 80 },
  { id: 3, name: 'Retro Classic', price: 180, image: keyboardImages[2], description: 'Inspired by vintage typewriters.', color: 'Beige', rgb: false, switchType: 'Clicky', wireless: true, size: 100 },
  { id: 4, name: 'Compact Code', price: 140, image: keyboardImages[3], description: 'A 60% compact keyboard for developers.', color: 'Black', rgb: true, switchType: 'Linear', wireless: false, size: 60 },
  { id: 5, name: 'Arctic Fox', price: 175, image: keyboardImages[4], description: 'A pristine white keyboard with ice-blue backlighting.', color: 'White', rgb: true, switchType: 'Tactile', wireless: true, size: 75 },
  { id: 6, name: 'Obsidian TKL', price: 155, image: keyboardImages[5], description: 'A solid, no-frills tenkeyless board for typists.', color: 'Black', rgb: false, switchType: 'Tactile', wireless: false, size: 80 },
  { id: 7, name: 'Bubblegum Pop', price: 130, image: keyboardImages[6], description: 'A fun and colorful 65% keyboard.', color: 'Pink', rgb: true, switchType: 'Linear', wireless: true, size: 65 },
  { id: 8, name: 'Executive Suite', price: 220, image: keyboardImages[7], description: 'A full-sized keyboard with a premium aluminum case.', color: 'Silver', rgb: false, switchType: 'Linear', wireless: false, size: 100 },
  { id: 9, name: 'GamerX 1000', price: 195, image: keyboardImages[8], description: 'Full RGB, dedicated macro keys, and clicky switches.', color: 'Black', rgb: true, switchType: 'Clicky', wireless: true, size: 100 },
  { id: 10, name: 'The Scribe', price: 160, image: keyboardImages[9], description: 'A compact wireless keyboard for writers.', color: 'Beige', rgb: false, switchType: 'Tactile', wireless: true, size: 65 },
  { id: 11, name: 'RGB Wave', price: 125, image: keyboardImages[10], description: 'An entry-level mechanical keyboard with brilliant RGB.', color: 'Black', rgb: true, switchType: 'Linear', wireless: false, size: 100 },
  { id: 12, name: 'Silent Knight', price: 190, image: keyboardImages[11], description: 'Engineered with sound-dampening foam.', color: 'Silver', rgb: false, switchType: 'Linear', wireless: true, size: 100 },
  { id: 13, name: 'Pastel Dream', price: 150, image: keyboardImages[12], description: 'A keyboard featuring a mix of pastel-colored keycaps.', color: 'Pink', rgb: true, switchType: 'Tactile', wireless: false, size: 75 },
  { id: 14, name: 'The Minimalist', price: 135, image: keyboardImages[13], description: 'A 60% board with clean lines for a pure aesthetic.', color: 'White', rgb: false, switchType: 'Linear', wireless: false, size: 60 },
  { id: 15, name: 'Click-Clack Pro', price: 170, image: keyboardImages[14], description: 'Loud and proud with satisfyingly loud clicky switches.', color: 'Silver', rgb: true, switchType: 'Clicky', wireless: true, size: 80 },
  { id: 16, name: 'Code Runner', price: 185, image: keyboardImages[15], description: 'A split ergonomic keyboard to reduce wrist strain.', color: 'Black', rgb: true, switchType: 'Tactile', wireless: false, size: 80 },
  { id: 17, name: 'Ivory Charm', price: 195, image: keyboardImages[16], description: 'An elegant beige keyboard with gold accents.', color: 'Beige', rgb: true, switchType: 'Tactile', wireless: true, size: 75 },
  { id: 18, name: 'Pink Petal', price: 145, image: keyboardImages[17], description: 'A pink and white keyboard with cherry blossom details.', color: 'Pink', rgb: false, switchType: 'Linear', wireless: false, size: 80 },
  { id: 19, name: 'Cloud White', price: 150, image: keyboardImages[18], description: 'A soft, all-white 65% keyboard for a clean setup.', color: 'White', rgb: true, switchType: 'Linear', wireless: true, size: 65 },
  { id: 20, name: 'Forge Master', price: 250, image: keyboardImages[19], description: 'A premium, full-sized board with analog optical switches.', color: 'Black', rgb: true, switchType: 'Linear', wireless: false, size: 100 },
];

// The rest of the App.js component remains exactly the same.
function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => { setProducts(mockProducts); }, []);

  const handleAddToCart = (productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  const handleNavigate = (view, productId = null) => {
    setSelectedProductId(productId);
    setCurrentView(view);
  };
  
  const handleProcessPayment = () => {
    setCartItems([]);
    setCurrentView('confirmation');
  };

  const handleSurveySubmit = () => {
    setCurrentView('survey-thanks');
  };

  const renderView = () => {
    switch (currentView) {
      case 'detail':
        const selectedProduct = products.find(p => p.id === selectedProductId);
        return <ProductDetailScreen product={selectedProduct} onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      case 'cart':
        return <CartScreen cartItems={cartItems} onRemove={handleRemoveFromCart} onNavigate={handleNavigate} />;
      case 'payment':
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return <PaymentScreen totalPrice={totalPrice} onProcessPayment={handleProcessPayment} />;
      case 'confirmation':
        return <ConfirmationScreen onSurveySubmit={handleSurveySubmit} />;
      case 'survey-thanks':
        return <SurveyThanksScreen onNavigate={handleNavigate} />;
      case 'list':
      default:
        return <ProductListScreen products={products} onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)} onNavigate={handleNavigate} />
      <main className="container py-4 flex-grow-1">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;