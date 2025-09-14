import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleErrorMsg, handleSuccessMsg } from "../config/toast";
import axios from "axios";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("debitCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const location = useLocation();
  const bookingDetails = location.state?.paymentDetail;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      movie: bookingDetails.movie._id,
      theater: bookingDetails.theatre,
      screen: "Screen 1",
      showTime: bookingDetails.selectedTime,
      seats: bookingDetails.seats,
      totalPrice:
        Number(
          bookingDetails?.movie.price.split("₹")[1] *
            bookingDetails.seats.length
        ) +
        50 +
        26,
      status: "booked",
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/booking/addBooking",
        obj,
        { withCredentials: true }
      );
      handleSuccessMsg(res.data.message);
      setPaymentConfirmed(true);
      setTimeout(() => {
        navigate("/booked-tickets");
      }, 1000);
    } catch (err) {
      handleErrorMsg("Something Went Wrong! Try again later" + err);
      console.log(err);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 mt-13">
          Complete Your Booking
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/5">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">
                Order Summary
              </h2>
              <div className="flex items-start mb-6">
                <div className="w-20 h-24 bg-gray-100 rounded-md mr-4 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <img
                      src={bookingDetails.movie.imageUrl}
                      alt={bookingDetails.movie.title}
                    />
                    <i className="fas fa-film text-white text-2xl"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {bookingDetails?.movie?.title}
                  </h3>
                  <p className="text-gray-600">
                    {bookingDetails?.movieDate} • {bookingDetails?.selectedTime}
                  </p>
                  <p className="text-gray-600">{bookingDetails?.theatre}</p>
                  <p className="text-gray-600 bg-blue-100 w-fit px-2 rounded-md mt-2">
                    Seats:{" "}
                    <span className="text-blue-400 font-semibold">
                      {bookingDetails?.seats.join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">
                    ₹
                    {bookingDetails?.movie.price.split("₹")[1] *
                      bookingDetails.seats.length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Booking Fee</span>
                  <span className="text-gray-900">₹50</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Tax</span>
                  <span className="text-gray-900">₹26</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-3 pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">
                    ₹
                    {Number(
                      bookingDetails?.movie.price.split("₹")[1] *
                        bookingDetails.seats.length
                    ) +
                      50 +
                      26}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:w-3/5">
            {!paymentConfirmed ? (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-2 text-gray-800">
                  Payment Details
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 mb-2 font-medium"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3 font-medium">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className={`py-3 px-4 border-2 rounded-lg text-center transition-all ${
                          paymentMethod === "debitCard"
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setPaymentMethod("debitCard")}
                      >
                        <div className="text-blue-600 text-xl mb-2">
                          <i className="fas fa-credit-card"></i>
                        </div>
                        <p className="font-medium text-gray-800">Debit Card</p>
                      </button>

                      <button
                        type="button"
                        className={`py-3 px-4 border-2 rounded-lg text-center transition-all ${
                          paymentMethod === "upi"
                            ? "border-blue-500 bg-blue-50 shadow-sm"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <div className="text-green-600 text-xl mb-2">
                          <i className="fas fa-mobile-alt"></i>
                        </div>
                        <p className="font-medium text-gray-800">UPI</p>
                      </button>
                    </div>
                  </div>

                  {/* Debit Card Form */}
                  {paymentMethod === "debitCard" && (
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-gray-700 mb-2 font-medium"
                          htmlFor="cardNumber"
                        >
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength="19"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <i className="fas fa-credit-card text-gray-400"></i>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 mb-2 font-medium"
                          htmlFor="cardName"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-gray-700 mb-2 font-medium"
                            htmlFor="expiry"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label
                            className="block text-gray-700 mb-2 font-medium"
                            htmlFor="cvv"
                          >
                            CVV
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cvv"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength="3"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <i
                                className="fas fa-question-circle text-gray-400"
                                title="3-digit code on the back of your card"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Form */}
                  {paymentMethod === "upi" && (
                    <div>
                      <label
                        className="block text-gray-700 mb-2 font-medium"
                        htmlFor="upiId"
                      >
                        UPI ID
                      </label>
                      <input
                        type="text"
                        id="upiId"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required
                      />
                      <p className="text-gray-500 text-sm mt-2">
                        You will be redirected to your UPI app to complete the
                        payment
                      </p>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="mt-6 mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                      />
                      <span className="ml-2 text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </a>
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <i className="fas fa-lock mr-2"></i>₹
                    {Number(bookingDetails?.movie.price.split("₹")[1] * 2) +
                      50 +
                      26}{" "}
                    Pay Now
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">
                  Payment Confirmation
                </h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 text-green-600 rounded-full p-4 animate-pulse">
                    <i className="fas fa-check-circle text-4xl"></i>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600">
                    Your tickets have been booked successfully
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {bookingDetails.movie.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {bookingDetails.movieDate} •{" "}
                        {bookingDetails.selectedTime}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      CONFIRMED
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Theater</p>
                      <p className="font-medium text-gray-900">
                        {bookingDetails.theatre}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Screen : 2</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-medium text-gray-900">
                      {bookingDetails?.seats.join(", ")}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Booking ID</p>
                      <p className="font-mono text-gray-900">CNE789456123</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold text-blue-600">
                        ₹
                        {Number(
                          bookingDetails?.movie.price.split("₹")[1] *
                            bookingDetails.seats.length
                        ) +
                          50 +
                          26}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-sm">
                  <p>Your tickets have been sent to {email}</p>
                  <p className="mt-2">
                    You can also view your tickets in the 'My Tickets' section
                  </p>
                </div>
              </div>
            )}

            {!paymentConfirmed && (
              <div className="mt-6 text-center text-gray-500 text-sm">
                <div className="flex justify-center items-center mb-2">
                  <i className="fas fa-lock text-green-500 mr-2"></i>
                  Secure Payment
                </div>
                <p>Your payment information is encrypted and secure</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 CinePrime. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            •
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            •
            <a href="#" className="text-blue-600 hover:underline">
              Help Center
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PaymentPage;
