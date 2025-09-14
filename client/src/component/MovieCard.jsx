import React from "react";
import { NavLink } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // console.log(movie)
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Movie Image */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          New
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 truncate max-w-[60%]">
            {movie.title}
          </h2>
          <span className="text-md font-semibold text-blue-600">
            {movie.price}
          </span>
        </div>

        {/* Genre and Language */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {movie?.genre.split(",")[0].trim()}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {movie.language}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-tight">
          {movie.description}
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <NavLink
            to={`/${movie._id}`}
            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm font-medium flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Book Ticket
          </NavLink>
          <NavLink
            to={`/${movie._id}`}
            className="flex-1 text-center cursor-alias px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm font-medium"
          >
            View Detail
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
