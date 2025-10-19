import { useNavigate } from "react-router-dom";

const GridCard = ({ id, name, description, entryPoint, members }) => {
  const navigate = useNavigate();
  // const entryThresholdInEth = formatEther(entryPoint);
  return (
    <div className="w-[95%] mx-auto md:w-full border border-[#1e2a46] py-2 rounded-lg">
      <div className="mx-auto w-[95%]">
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-base md:text-lg">{name} </h2>

          {/* <h4 className="bg-[#1f2b45] rounded-2xl px-4 text-sm md:text-base font-semibold py-1">
            #{rank}
          </h4> */}
        </div>
        <p className=" text-sm md:text-base py-2">{description}</p>
        <div className="py-3 w-full flex items-center gap-2">
          <div className="border border-[#1e2a46] w-full rounded-lg py-2">
            <div className="w-[92%] mx-auto">
              <h2 className="font-semibold text-sm md:text-base lg:text-lg">
                Access Amount
              </h2>
              <h2 className="font-bold text-lg md:text-xl text-green-800 mt-1">
                {entryPoint} HYPE
              </h2>
            </div>
          </div>
          <div className="border border-[#1e2a46] w-full rounded-lg py-2">
            <div className="w-[92%] mx-auto">
              <h2 className="font-semibold text-sm md:text-base lg:text-lg">
                Members
              </h2>
              <h2 className="font-bold text-lg md:text-xl mt-1">{members}</h2>
            </div>
          </div>
        </div>
        <div className="w-full py-1 ">
          <button
            className="bg-[#6d8cff] cursor-pointer w-full py-1 text-sm md:text-base font-semibold rounded-lg text-[#081423]"
            onClick={() => navigate(`/dashboard/guilds/${id}`)}
          >
            View Guild
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
