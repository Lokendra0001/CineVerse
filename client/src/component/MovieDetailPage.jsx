import axios from "axios";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FiPlus, FiPlay, FiLink2 } from "react-icons/fi"; // React Icons
import { NavLink, useNavigate, useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [movie, setMovie] = useState("");
  const navigate = useNavigate();
  const { id } = useParams("id");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/movie/getMovie/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data) {
          console.log(data);
          setMovie(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [id]);

  const showtime = ["10:00 AM", "1:30 PM", "4:00 PM", "6:30 PM", "9:00 PM"];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <button
        onClick={() => navigate(-1)} // go back
        className="fixed top-20 left-10 z-40 flex items-center gap-1 px-3 py-2 bg-blue-500  hover:bg-blue-600 text-white rounded-full transition-colors duration-300 shadow-md"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
        <span className="font-medium">Back</span>
      </button>

      {/* Banner */}
      <div className="relative h-70 w-full overflow-hidden">
        <img
          src={
            "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-800" />
        <div className="absolute bottom-18 left-10 ">
          <h1 className="text-5xl  font-semibold text-white drop-shadow-md">
            {movie.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded text-sm">
              {movie.duration}
            </span>
            <span className="bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded text-sm">
              {movie.genre}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-22 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Movie Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Poster */}
                <div className="w-full md:w-72">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                      Language : {movie.language}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-5 leading-relaxed">
                    {movie.description}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-md font-semibold mb-1 text-gray-900">
                      Genre
                    </h3>
                    <p className="text-gray-700">{movie.genre}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-md font-semibold mb-1 text-gray-900">
                      Rating
                    </h3>
                    <p className="text-gray-700">⭐{movie.rating} (5.0)</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-md font-semibold mb-2 text-gray-900">
                      Duration :
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        {movie.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Booking */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
              <h2 className="text-xl font-bold mb-5 text-gray-900">
                Showtimes & Tickets
              </h2>

              <div className="mb-5">
                <h3 className="font-semibold mb-3 text-gray-900">
                  Select Showtime
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {showtime.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded text-center text-sm font-medium ${
                        selectedTime === time
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">
                  Price Details
                </h3>
                <p className="text-xl text-blue-600 font-bold">
                  {movie.price}{" "}
                  <span className="text-sm text-gray-600">/ ticket</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  All taxes and fees included
                </p>
              </div>

              <div>
                <NavLink
                  to={selectedTime ? `/${movie._id}/book-seat` : "#"} // only navigate if selectedTime exists
                  state={{ selectedTime }}
                  className={`w-full px-4 py-3 rounded font-medium transition ${
                    selectedTime
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!selectedTime) e.preventDefault(); // prevent navigation if no showtime
                  }}
                >
                  {selectedTime ? "Book Now" : "Select a showtime"}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
