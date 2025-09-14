import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/booking/allBookings",
          { withCredentials: true }
        );
        // Assuming backend returns array of bookings in response.data.bookings
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl h-screen flex justify-center items-center text-gray-700">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="max-w-3xl h-screen flex justify-center items-center flex-col mx-auto p-6 text-center">
        <FaTicketAlt className="text-blue-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">
          No Bookings Yet
        </h2>
        <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow">
          Explore Movies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-blue-700 mt-20 mb-8 text-center">
        Your Booking History
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200 flex flex-col sm:flex-row"
          >
            {/* Poster */}
            <img
              src={booking.movie.imageUrl || "https://via.placeholder.com/150"} // fallback if posterUrl missing
              alt={`${booking.movie.title || "Movie"} poster`}
              className="sm:w-40 w-full h-60 sm:h-auto object-cover"
            />

            {/* Info */}
            <div className="p-4 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {booking.movie.title || "Unknown Movie"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 mb-3 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  {booking.theater}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {formatDate(booking.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-blue-500" />
                    {booking.showTime}
                  </div>
                  <div className="flex items-center">
                    <FaChair className="mr-2 text-blue-500" />
                    {booking.seats.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="mr-2 text-blue-500" />₹
                    {booking.totalPrice}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end items-center mt-5">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === "booked"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status === "booked" ? "Confirmed" : "Cancelled"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-gray-500 text-sm">
        Showing {bookings.length}{" "}
        {bookings.length === 1 ? "booking" : "bookings"}
      </p>
    </div>
  );
};

export default BookingHistory;
