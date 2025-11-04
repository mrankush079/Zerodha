import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Landing pages
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

// Auth pages
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";
import Unauthorized from "./auth/Unauthorized";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword"; // ✅ Optional

// Dashboard layout and views
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/DashboardHome";
import DashboardAdmin from "./dashboard/DashboardAdmin";
import MarketTrends from "./dashboard/MarketTrends";
import WatchList from "./dashboard/WatchList";
import Holdings from "./dashboard/Holdings";
import Positions from "./dashboard/Positions";
import Orders from "./dashboard/Orders";
import Portfolio from "./dashboard/Profile";
import SettingsPage from "./dashboard/SettingsPage";

// Admin subpages
import AdminOverview from "./dashboard/AdminOverview";
import AdminUsers from "./dashboard/AdminUsers";
import AdminLogs from "./dashboard/AdminLogs";
import AdminAnalytics from "./dashboard/AdminAnalytics";

function AppWrapper() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}

      <Routes>
        {/* Public landing routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* ✅ Optional */}

        {/* Protected dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          <Route path="market" element={<MarketTrends />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="orders" element={<Orders />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Admin routes */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <DashboardAdmin />
              </AdminRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}