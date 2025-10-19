import { useState } from "react";
import { leaderDummy } from "./Dummy";

const LeaderboardComp = () => {
  const [activeTab, setActiveTab] = useState("guild");
  const tab = [
    {
      id: "guild",
      label: "Guild",
    },
    {
      id: "individual",
      label: "Individual",
    },
    {
      id: "volume",
      label: "Volume",
    },
  ];

  return (
    <div className="w-full my-5 border border-[#1e2a46] py-1.5 rounded-lg">
      <div className="w-[96%] mx-auto">
        <h2 className="font-semibold text-lg md:text-xl">Leaderboards</h2>
        <div className="w-full mt-4 border border-[#1e2a46] rounded-lg py-2">
          <div className="w-[95%] mx-auto ">
            <div className="flex items-center gap-1.5 md:gap-3">
              {tab.map((tab) => (
                <button
                  key={tab.id}
                  className={`cursor-pointer text-white text-xs md:text-sm lg:text-base rounded-xl md:font-semibold px-2 md:px-3 py-0.5 md:py-1 border border-[#222b3a] ${
                    activeTab === tab.id ? "bg-[#1f2b45]" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="my-5 w-[95%] mx-auto">
            {activeTab === "guild" ? (
              <div className="w-full border border-[#1e2a46] rounded-lg py-2 overflow-x-auto ">
                <table className="min-w-full o ">
                  <thead className="border-b border-b-[#1e2a46] ">
                    <tr>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        #
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Guild
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        7d P&L
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Members
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Volume
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full text-center ">
                    {leaderDummy.map((data) => (
                      <tr
                        key={data.id}
                        className="w-full border-b  border-b-[#1e2a46]"
                      >
                        <td className=" py-2 text-sm md:text-base ">
                          {data.id}
                        </td>
                        <td className=" py-2 text-sm md:text-base ">
                          {data.name}
                        </td>
                        <td className="py-2 text-sm md:text-base  ">
                          <div className={`text-green-800 py-1 `}>
                            {data.pl}
                          </div>
                        </td>
                        <td className=" py-2 text-sm md:text-base">
                          {data.members}
                        </td>
                        <td className={`py-2 text-sm md:text-base `}>
                          {data.volume}
                        </td>
                        <td className="py-2 text-sm md:text-base px-3 font-semibold ">
                          <div
                            className={`rounded-3xl py-1 bg-[#6d8cff] text-[#081423]`}
                          >
                            view
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === "individual" ? (
              <div>Individual</div>
            ) : (
              <div>Volume</div>
            )}
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardComp;
