import { useNavigate } from "react-router-dom";
import GridCard from "./GridCard";
import { guildsData } from "./Dummy";

const DiscoverGuild = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-5 border border-[#1e2a46] py-1.5 rounded-lg ">
      <div className="w-[96%] mx-auto">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-lg md:text-xl">Discover Guild</h2>
          <button
            className="rounded-lg px-4 py-1 bg-[#1f2b45]"
            onClick={() => navigate("/dashboard/guilds")}
          >
            Browse All
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {guildsData?.slice(0, 3).map((item) => (
            <GridCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverGuild;
