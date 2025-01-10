import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import PageNotFound from './components/ui/PageNotFound';
import ProductPage from './components/product/ProductPage';
import api from './api';
import CartPage from './components/cart/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import LoginPage from './components/user/LoginPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UserProfile from './components/user/UserProfile';
import PaymentStatusPage from './components/payments/PaymentStatusPage';

function App() {

  const [numCartItems, setNumCartItems] = useState(0);
  useEffect(() => {
    const cart_code = localStorage.getItem("cart_code");
    if (cart_code && numCartItems > 0) {
      api.get(`get_cart_stats?cart_code=${cart_code}`)
        .then(response => {
          console.log(response.data);
          setNumCartItems(response.data.num_of_items);
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route path='products/:slug' element={<ProductPage setNumCartItems={setNumCartItems} />} />
            <Route path='cart/' element={<CartPage setNumCartItems={setNumCartItems} />} />
            <Route path='checkout/' element={<ProtectedRoute><CheckoutPage /></ ProtectedRoute>} />
            <Route path='login/' element={<LoginPage />} />
            <Route path='profile/' element={<UserProfile />} />
            <Route path='payment-status/' element={<PaymentStatusPage setNumCartItems={setNumCartItems} />} />


            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
