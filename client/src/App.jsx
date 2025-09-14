import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import { handleSuccessMsg } from "./config/toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./store/slices/userSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:3000/user/getCurrentUser", {
        withCredentials: true,
      });
      if (res?.data?.user) {
        dispatch(addUser(res?.data?.user));
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* child pages render here */}
      </main>
    </>
  );
}
