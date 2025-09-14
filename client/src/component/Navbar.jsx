import { useState, useEffect } from "react";
import {
  RiMovie2Line,
  RiHome4Line,
  RiMovieLine,
  RiUserLine,
  RiSearchLine,
  RiMenuLine,
  RiCloseLine,
  RiHeartLine,
  RiNotificationLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiTicket2Fill,
} from "react-icons/ri";
import { FiCheck, FiCreditCard } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVal, removeVal } from "../store/slices/searchSlice";
import { handleErrorMsg, handleSuccessMsg } from "../config/toast";
import axios from "axios";
import { removeUser } from "../store/slices/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [scrolled, setScrolled] = useState(false);
  const [searchedVal, setSearchVal] = useState("");

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/user/logoutUser",
        {
          withCredentials: true,
        }
      );
      handleSuccessMsg(data.message);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      handleErrorMsg("Something Went Wrong!");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(addVal(searchedVal));
  }, [searchedVal]);

  const navigate = useNavigate();

  const navLinks = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: RiHome4Line,
      active: true,
    },
    {
      id: 2,
      name: "Movies",
      path: "/movies",
      icon: RiMovieLine,
      active: true,
    },
    {
      id: 3,
      name: "Booked Ticket",
      path: "/booked-tickets",
      icon: FiCreditCard,
      active: user,
    },
  ];

  const [selectedLink, setSelectedLink] = useState(1);

  return (
    <nav className={`fixed top-0 z-50 w-full  py-2 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container that changes based on scroll */}
        <div
          className={`rounded-2xl transition-all duration-500 ${
            scrolled || selectedLink != 1
              ? "bg-white shadow-xl border border-white/10"
              : "backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl shadow-blue-500/10"
          }`}
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center pl-2 md:pl-4">
              <div
                className={`p-2 rounded-xl mr-3 shadow-lg transition-colors duration-300 ${
                  scrolled
                    ? "bg-gradient-to-br from-cyan-500 to-blue-700"
                    : "bg-gradient-to-br from-cyan-400 to-blue-600"
                }`}
              >
                <RiMovie2Line className="text-white text-xl" />
              </div>
              <NavLink
                to={"/"}
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled || selectedLink != 1 ? "text-gray-800" : "text-white"
                }`}
              >
                CineVerse
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map(
                (link) =>
                  link.active && (
                    <NavLink
                      key={link.id}
                      to={link.path}
                      onClick={() => {
                        setSelectedLink(link.id);
                        setSearchVal("");
                      }}
                      className={({ isActive }) =>
                        `flex items-center transition-all px-4 py-2 rounded-xl group font-medium ${
                          scrolled || selectedLink != 1
                            ? isActive
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            : isActive
                            ? "bg-white/20 text-white"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`
                      }
                    >
                      <link.icon className="mr-2 transition-transform group-hover:scale-110" />
                      <span>{link.name}</span>
                    </NavLink>
                  )
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 pr-2 md:pr-4">
              {/* Search Bar */}
              <div
                className={`hidden lg:flex items-center rounded-full px-4 py-2 transition-all duration-300 mr-10 ${
                  scrolled || selectedLink != 1
                    ? "bg-gray-200 "
                    : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <RiSearchLine
                  className={
                    scrolled || selectedLink != 1
                      ? "text-gray-500"
                      : "text-white/80"
                  }
                />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchedVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    navigate("/movies");
                  }}
                  className={`ml-2 bg-transparent border-none focus:outline-none w-40 ${
                    scrolled || selectedLink != 1
                      ? "text-gray-800 placeholder-gray-500"
                      : "text-white placeholder-white/60"
                  }`}
                />
              </div>

              {/* User Profile */}
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center py-3 px-4 rounded-xl transition-colors ${
                      scrolled || selectedLink != 1
                        ? "text-gray-800 hover:text-red-600  cursor-pointer"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <RiLogoutBoxRLine className="mr-3" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <NavLink
                    to={"/login"}
                    className={`px-4 py-2 font-medium transition-colors ${
                      scrolled || selectedLink != 1
                        ? "text-blue-600 hover:text-blue-800"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    className={`px-4 py-2 rounded-xl font-medium transition-all shadow-lg ${
                      scrolled
                        ? "bg-gradient-to-r from-cyan-500 to-blue-700 text-white hover:opacity-90"
                        : "bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:opacity-90"
                    }`}
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled || selectedLink != 1
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <RiCloseLine className="text-2xl" />
                ) : (
                  <RiMenuLine className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className={`lg:hidden py-4 rounded-b-2xl transition-colors ${
                scrolled || selectedLink != 1
                  ? "bg-white border-t border-gray-200"
                  : "bg-white/5 border-t border-white/10"
              }`}
            >
              <div className="flex flex-col space-y-2 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl transition-colors ${
                        scrolled || selectedLink != 1
                          ? isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          : isActive
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`
                    }
                    onClick={() => {
                      setIsMenuOpen(false);
                      setSearchVal("");
                      setSelectedLink(link.id);
                    }}
                  >
                    <link.icon className="mr-3" />
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                ))}

                <div
                  className={`pt-4 ${
                    scrolled || selectedLink != 1
                      ? "border-t border-gray-200"
                      : "border-t border-white/10"
                  }`}
                >
                  <div
                    className={`flex items-center rounded-full px-4 py-3 mb-4 ${
                      scrolled || selectedLink != 1
                        ? "bg-gray-100"
                        : "bg-white/10"
                    }`}
                  >
                    <RiSearchLine
                      className={
                        scrolled || selectedLink != 1
                          ? "text-gray-500"
                          : "text-white/80"
                      }
                    />
                    <input
                      type="text"
                      placeholder="Search movies..."
                      value={searchedVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      className={`ml-2 bg-transparent border-none focus:outline-none flex-1 ${
                        scrolled || selectedLink != 1
                          ? "text-gray-800 placeholder-gray-500"
                          : "text-white placeholder-white/60"
                      }`}
                    />
                  </div>

                  {user ? (
                    <>
                      <button
                        className={`flex items-center py-3 px-4 rounded-xl transition-colors ${
                          scrolled || selectedLink != 1
                            ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <RiLogoutBoxRLine className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                          scrolled || selectedLink != 1
                            ? "text-blue-600 border border-blue-300 hover:bg-blue-50"
                            : "text-white border border-white/30 hover:bg-white/10"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        className={`flex-1 py-3 rounded-xl font-medium transition-all shadow-md ${
                          scrolled || selectedLink != 1
                            ? "bg-gradient-to-br from-cyan-500 to-blue-700 text-white hover:opacity-90"
                            : "bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:opacity-90"
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
