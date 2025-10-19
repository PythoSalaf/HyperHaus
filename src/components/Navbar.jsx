import { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { usePrivy } from "@privy-io/react-auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { login, logout } = usePrivy();
  const { authenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full fixed bg-[#0f1724] border-b  border-b-[#202a3a] flex items-center text-white py-3">
      <div className="w-[95%] mx-auto md:w-[92%] flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl lg:text-3xl">
          HyperHaus
        </Link>
        <div className="hidden md:flex items-center gap-x-6">
          <Link>Home</Link>
          <Link>How it works</Link>
          <Link>Benefits</Link>
          <Link>Guilds</Link>
        </div>
        <div className="hidden md:flex">
          <button
            style={{ display: authenticated ? "none" : "flex" }}
            onClick={login}
            className="hidden cursor-pointer active:bg-blue-800 active:scale-95 transition-transform duration-300 ease-in-out 
          md:block bg-[#5b8eff] text-white px-3 ml-4 py-1.5 rounded-lg"
          >
            Login / Sign Up
          </button>
          <button
            style={{ display: authenticated ? "flex" : "none" }}
            onClick={handleLogout}
            className="hidden active:bg-blue-800 active:scale-95 transition-transform duration-300 ease-in-out 
          md:block bg-[#5b8eff] text-white px-3 ml-4 py-1.5 rounded-lg"
          >
            Logout
          </button>
        </div>
        <div className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MdClose className="size-8" />
          ) : (
            <MdMenu className="size-8" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-14 flex items-center flex-col gap-8  w-full py-10 bg-[#1e2a46]">
          <Link
            className="text-base font-semibold"
            to="/"
            onClick={() => setIsOpen(!isOpen)}
          >
            Home
          </Link>
          <Link
            className="text-base font-semibold"
            to="/"
            onClick={() => setIsOpen(!isOpen)}
          >
            Dashboard
          </Link>
          <Link
            className="text-base font-semibold"
            to=""
            onClick={() => setIsOpen(!isOpen)}
          >
            Guilds
          </Link>
          <Link
            className="text-base font-semibold"
            to=""
            onClick={() => setIsOpen(!isOpen)}
          >
            Leaderboard
          </Link>
          <div className="">
            {authenticated ? (
              <button
                className="bg-[#5b8eff] text-white text-base font-semibold px-6 py-1.5 rounded-xl"
                onClick={login}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-[#5b8eff] text-white text-base font-semibold px-6 py-1.5 rounded-xl"
                onClick={logout}
              >
                Login/Signin
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
