import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
const Topbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative w-[98%] mx-auto md:w-full ">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="block md:hidden text-xl font-semibold">
            HyperHaus
          </Link>
          <div className="hidden md:flex">
            <input
              type="search"
              placeholder="search guilds, traders, strategies"
              className=" border border-[#dadada] rounded-lg px-3 h-8 outline-0 w-48 md:w-52 lg:w-80"
            />
          </div>
        </div>
        <div className="relative">
          <button className="bg-[#202b46] px-6 rounded-lg py-1.5 cursor-pointer hidden md:block">
            Create Guild
          </button>
          <div className="md:hidden block relative">
            <div className="" onClick={() => setToggle(!toggle)}>
              {toggle ? (
                <MdClose className="w-7 h-7" />
              ) : (
                <MdMenu className="w-7 h-7" />
              )}
            </div>
          </div>
        </div>
      </div>

      {toggle && (
        <div className="absolute  bg-[#202b46] w-full flex-col  py-8 top-10 flex items-center  gap-7">
          <Link to="/dashboard" onClick={() => setToggle(!toggle)}>
            Dashboard
          </Link>
          <Link to="/dashboard/guilds" onClick={() => setToggle(!toggle)}>
            Guilds
          </Link>
          <Link to="/dashboard/leaderboards" onClick={() => setToggle(!toggle)}>
            Leaderboards
          </Link>
          <Link onClick={() => setToggle(!toggle)}>My Guild</Link>
          <Link onClick={() => setToggle(!toggle)}>Rewards</Link>
          <Link onClick={() => setToggle(!toggle)}>Treasury</Link>
          <Link onClick={() => setToggle(!toggle)}>Settings</Link>
        </div>
      )}
    </div>
  );
};

export default Topbar;
