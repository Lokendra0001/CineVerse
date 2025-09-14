import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  RiPlayFill,
  RiInformationLine,
  RiStarFill,
  RiCalendarEventLine,
  RiTimeLine,
  RiMovie2Line,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchedVal = useSelector((state) => state.search.searchedVal);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedVal) {
      navigate("/movies");
    }
  }, [searchedVal]);

  return (
    <div className="h-screen  bg-gray-900 text-white">
      {/* Hero Section with Movie Banner */}
      <div className="relative h-screen pt-40">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/mahavatar-narsimha-review-emotionally-uplifting-tale-about-devotion-and-compassion-255245427-16x9.jpg?VersionId=jFdIPwzkBMCRgAweBUYFia4Qlh3Gfdfp?size=1280:720')",
          }}
        ></div>

        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Narshima Mahaavtar
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <RiStarFill className="text-yellow-400 mr-1" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center">
                  <RiTimeLine className="text-blue-400 mr-1" />
                  <span>2h 46m</span>
                </div>
                <div className="flex items-center">
                  <RiCalendarEventLine className="text-red-400 mr-1" />
                  <span>2025</span>
                </div>
              </div>
              <p className="text-lg text-gray-300 mb-8">
                Witness the divine incarnation of Lord Vishnu as Narshima, the
                half-lion half-man avatar, in this epic tale of power, devotion,
                and the ultimate victory of good over evil.
              </p>
              <div className="flex space-x-4">
                <NavLink
                  to={"/movies"}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                >
                  Explore More
                  <ChevronRight className="ml-2" size={20} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
