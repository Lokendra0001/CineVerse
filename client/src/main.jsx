import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // ✅ import
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import MovieDetailPage from "./component/MovieDetailPage.jsx";
import store from "./store/store.js";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Toaster } from "react-hot-toast";
import SeatBooking from "./component/SeatBook.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/booked-tickets" element={<BookingHistory />} />
          <Route path="/:id" element={<MovieDetailPage />} />
          <Route path="/:id/book-seat" element={<SeatBooking />} />
          <Route path="/:id/book-seat/payment" element={<PaymentPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster
      position="top-center"
      toastOptions={{
        className: "text-sm rounded-md shadow-lg ",
        duration: 1500,
        style: {
          background: "#1f2937", // Tailwind gray-800
          color: "#fff",
        },
        success: {
          iconTheme: {
            primary: "#10b981", // Tailwind green-500
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // Tailwind red-500
            secondary: "#fff",
          },
        },
      }}
    />
  </Provider>
  // </StrictMode>
);
