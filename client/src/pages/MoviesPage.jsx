import React, { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard";
import {
  RiPlayFill,
  RiInformationLine,
  RiStarFill,
  RiCalendarEventLine,
  RiTimeLine,
  RiMovie2Line,
  RiFilmAiFill,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";

// Movies Page Component
const MoviesPage = () => {
  // Sample movie data
  const [movies, setMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState(movies);

  const searchedVal = useSelector((state) => state.search.searchedVal);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/movie/getAllMovies",
          {
            withCredentials: true,
          }
        );
        if (data) {
          // console.log(data)
          setMovies(data);
          setFilteredMovie(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    setFilteredMovie(movies);
    if (searchedVal) {
      const filterMov = movies.filter((mov) =>
        mov.title.toLowerCase().includes(searchedVal)
      );
      setFilteredMovie(filterMov);
    }
  }, [searchedVal]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-[350px] pt-30 rounded-bl-2xl rounded-br-2xl"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto text-center backdrop-blur-xs">
          <h1 className="flex items-center justify-center text-4xl text-white font-extrabold mb-4 sm:gap-3">
            <RiMovie2Line className="text-blue-300 hidden sm:block text-5xl drop-shadow-lg" />
            <span>Experience the Magic of Movies</span>
          </h1>

          <p className="text-lg text-zinc-300 mb-8 max-w-3xl mx-auto">
            Book your tickets for the latest blockbusters. Experience the magic
            of cinema with the best seats in the house.
          </p>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Available Movies
            </h2>
            <p className="text-gray-600 mt-1">
              Book your favorite movies in just a few clicks
            </p>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="min-h-[60dvh] h-full flex">
          {filteredMovie.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMovie.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="w-full flex-1 flex justify-center items-center">
              <div className="flex flex-col items-center justify-center text-center p-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg max-w-md mx-auto">
                <RiFilmAiFill className="w-16 h-16 mb-4 text-white opacity-90" />
                <h2 className="text-2xl font-bold mb-2">No Movies Found</h2>
                <p className="text-sm text-blue-100">
                  Looks like there are no movies available right now. Try
                  searching again later!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
