import { usePrivy } from "@privy-io/react-auth";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = usePrivy();
  return (
    <div className="text-white relative">
      <Link to="/" className="font-semibold text-2xl">
        HyperHaus
      </Link>
      <div className="mt-10 flex items-start gap-y-4 flex-col">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/dashboard/guilds">Guilds</NavLink>
        <NavLink to="/dashboard/leaderboards">Leaderboards</NavLink>
        <NavLink>My Guild</NavLink>
        <NavLink>Rewards</NavLink>
        <NavLink>Treasury</NavLink>
        <NavLink>Settings</NavLink>
      </div>
      <div className="absolute -bottom-60">
        <div className="bg-[#202b46] w-full px-7 py-1  rounded-xl ">
          <h4 className="w-full">0x8438.....09383</h4>
        </div>
        <button
          className="w-full mt-4 bg-[#202b46] py-1 cursor-pointer rounded-xl "
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
