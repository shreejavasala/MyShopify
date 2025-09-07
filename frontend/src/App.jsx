import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage";
import { AuthContext, AuthProvider } from "./contexts/AuthContext.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const RedirectAuthenticatedUser = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (token && user) {
    return <Navigate to="/items" replace />;
  }
  return children;
};

//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <ToastContainer position="top-right" autoClose={2000} />
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* home route takes to the items page */}
              <Route
                path="/"
                element={
                  <RedirectAuthenticatedUser>
                    <ItemsPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectAuthenticatedUser>
                    <LoginPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route
                path="/signup"
                element={
                  <RedirectAuthenticatedUser>
                    <SignUpPage />
                  </RedirectAuthenticatedUser>
                }
              />
              <Route path="/items" element={<ItemsPage />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/items" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
