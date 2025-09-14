import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ChevronDown, Clock10Icon, MapPin, Timer } from "lucide-react";
import { handleErrorMsg } from "../config/toast";
import { useDispatch, useSelector } from "react-redux";

export default function SeatBooking() {
  const { id } = useParams("id");
  const [movie, setMovie] = useState("");
  const location = useLocation();
  const selectedTime = location.state?.selectedTime;
  const [selectedTheater, setSelectedTheater] = useState({
    id: "vr",
    name: "PVR Cinemas - VR Surat",
    address: "VR Mall, Dumas Road",
    screen: "Screen 1",
  });
  const user = useSelector((state) => state.user.user);

  // Simple 8x8 seat layout
  const rows = 8;
  const cols = 8;

  // Example: these seats are already booked (from backend ideally)
  const [bookedSeats, setBookedSeat] = useState([]);

  // Theater options
  const theaters = [
    {
      id: "vr",
      name: "PVR Cinemas - VR Surat",
      address: "VR Mall, Dumas Road",
      screen: "Screen 1",
    },
    {
      id: "rahulraj",
      name: "INOX - RahulRaj Mall",
      address: "RahulRaj Mall, Dumas Road",
      screen: "Screen 3",
    },
    {
      id: "rajhans",
      name: "Rajhans Cinemas",
      address: "Adajan, Surat",
      screen: "Screen 2",
    },
    {
      id: "valentine",
      name: "Valentine Multiplex",
      address: "Piplod, Surat",
      screen: "Screen 4",
    },
    {
      id: "central",
      name: "INOX - Central Mall",
      address: "Ring Road, Surat",
      screen: "Screen 5",
    },
    {
      id: "cityplus",
      name: "Cinepolis - Imperial Square",
      address: "Bhatar Road, Surat",
      screen: "Screen 6",
    },
    {
      id: "srs",
      name: "SRS Cinemas",
      address: "Vesu, Surat",
      screen: "Screen 7",
    },
    {
      id: "time",
      name: "TIME Cinema",
      address: "Nanpura, Surat",
      screen: "Screen 1",
    },
    {
      id: "drworld",
      name: "DR World Multiplex",
      address: "Kamrej, Surat",
      screen: "Screen 2",
    },
    {
      id: "carnival",
      name: "Carnival Cinemas",
      address: "Athwalines, Surat",
      screen: "Screen 3",
    },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchAllBookedSeat = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/booking/getAllBookedSeats",
          {
            movie: movie._id,
            theater: selectedTheater.name,
            showTime: selectedTime,
          }
        );
        setBookedSeat(data?.bookedSeats);
      } catch (err) {
        handleErrorMsg(err);
      }
    };
    if (selectedTheater && movie) {
      fetchAllBookedSeat();
    }
  }, [selectedTheater, movie]);

  // Generate seat id like A1, A2, ...
  const getSeatId = (row, col) => String.fromCharCode(65 + row) + (col + 1);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // can't book occupied
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId)); // unselect
    } else {
      setSelectedSeats([...selectedSeats, seatId]); // select
    }
  };

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
          setMovie(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [id]);

  const movieDate = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  const paymentDetail = {
    movie: movie,
    selectedTime,
    seats: selectedSeats,
    movieDate,
    theatre: selectedTheater.name,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-6xl mx-auto pt-10 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
          <p className="text-indigo-100">
            Choose your perfect seats for {movie.title}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Details */}
          <div className="lg:w-2/5 p-8 bg-gray-50">
            {/* Movie Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {movie.title}
              </h2>
              <div className="flex items-center text-gray-600 mb-1">
                <span className="bg-amber-100 px-2">
                  Duration : {movie.duration}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mb-1">
                <Clock10Icon size={16} />
                <span>
                  {movie.date || movieDate}• {selectedTime}
                </span>
              </div>
            </div>

            {/* Theater Information */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Theater Information
              </h3>

              {/* Theater Dropdown */}
              <div className="relative mb-4">
                <select
                  value={selectedTheater.id}
                  onChange={(e) => {
                    const theater = theaters.find(
                      (t) => t.id === e.target.value
                    );
                    setSelectedTheater(theater);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none bg-white pr-10"
                >
                  {theaters.map((theater) => (
                    <option key={theater.id} value={theater.id}>
                      {theater.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Theater Details */}
              <div className="text-gray-600 space-y-1">
                <p className="text-gray-600">{selectedTheater?.address}</p>
                <p className="text-gray-600">
                  Screen:{" "}
                  <span className="font-medium">{selectedTheater?.screen}</span>
                </p>
              </div>
            </div>

            {/* Selection Summary */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">
                Your Selection
              </h3>
              {selectedSeats.length > 0 ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">
                    Total: {selectedSeats.length} seat(s)
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No seats selected yet. Click on available seats to select
                  them.
                </p>
              )}
            </div>

            {/* Legend */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Seat Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-200 rounded-md mr-3"></div>
                  <span className="text-gray-700">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-md mr-3"></div>
                  <span className="text-gray-700">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-400 rounded-md mr-3"></div>
                  <span className="text-gray-700">Occupied</span>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <NavLink
              state={{ paymentDetail }}
              to={`${
                !user
                  ? "/login"
                  : selectedSeats.length === 0
                  ? "#"
                  : "/" + movie._id + "/book-seat" + "/payment"
              }`}
              disabled={selectedSeats.length === 0}
              className={`w-full mt-8 px-6 py-3 rounded-xl bg-gradient-to-r ${
                selectedSeats.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : " from-cyan-600 to-blue-500  text-white hover:from-cyan-600 hover:to-blue-600"
              } font-medium  disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg`}
            >
              Confirm Booking
            </NavLink>
          </div>

          {/* Right Column - Seats */}
          <div className="lg:w-3/5 p-8">
            {/* Screen */}
            <div className="text-center mb-10">
              <div className="bg-gray-800 text-white py-2 rounded-t-md mx-auto max-w-md">
                SCREEN
              </div>
              <div className="h-2 bg-gradient-to-t from-gray-700 to-gray-400 mx-auto max-w-md rounded-b-md"></div>
              <p className="text-sm text-gray-500 mt-2">
                All eyes this way please
              </p>
            </div>

            {/* Seat Grid */}
            <div className="flex justify-center">
              <div className="mb-4">
                <div className="flex justify-between w-full mb-2 px-4">
                  <span className="text-sm text-gray-500">Front</span>
                  <span className="text-sm text-gray-500">Back</span>
                </div>

                <div
                  className="grid gap-3 mb-4 p-4 bg-gray-100 rounded-xl"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: rows }).map((_, row) =>
                    Array.from({ length: cols }).map((_, col) => {
                      const seatId = getSeatId(row, col);
                      const isBooked = bookedSeats?.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`w-10 h-10 rounded-md font-bold text-sm flex items-center justify-center transition-all
                            ${
                              isBooked
                                ? "bg-red-400 cursor-not-allowed text-white"
                                : isSelected
                                ? "bg-blue-500 text-white shadow-md transform scale-105"
                                : "bg-blue-200 hover:bg-blue-300 text-black hover:shadow-md"
                            }
                          `}
                          disabled={isBooked}
                        >
                          {seatId}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
