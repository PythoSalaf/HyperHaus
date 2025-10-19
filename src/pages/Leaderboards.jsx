import { leaderDummy } from "../components/Dummy";

const Leaderboards = () => {
  const performance = [
    {
      id: 1,
      title: "7d Total Guild P&L",
      value: "+$118.8K",
    },
    {
      id: 2,
      title: "Active Guilds",
      value: "1000",
    },
    {
      id: 3,
      title: "Avg Win Rate",
      value: "56.9%",
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full hidden md:flex items-center gap-20">
        <h2 className="font-semibold text-lg md:text-xl">Guilds</h2>
        <div className="flex items-center gap-14 ">
          <input
            type="text"
            placeholder="Category: All"
            className="border border-[#1e2a46] px-3 rounded-lg h-8 md:h-9"
          />
          <input
            type="text"
            placeholder="Sort: P&L"
            className="border border-[#1e2a46] px-3 rounded-lg h-8 md:h-9"
          />
          <input
            type="text"
            placeholder="Search guild names.........."
            className="border border-[#1e2a46] px-3 rounded-lg h-8 md:h-9"
          />
        </div>
        <div className="">
          <button className="bg-[#5b8eff] px-4 py-1.5 rounded-lg">
            Browse All
          </button>
        </div>
      </div>
      <div className="w-full my-7 border border-[#1e2a46] py-3 rounded-lg">
        <div className="w-[96%] mx-auto">
          <div className="border border-dashed w-full px-4 flex rounded-lg items-center justify-between border-[#1e2a46] py-2">
            <div className="">
              <h2 className="font-semibold text-sm md:text-lg lg:text-xl">
                Top Guild Performance
              </h2>
              <p className="pt-1.5 text-xs md:text-sm lg:text-base ">
                Track P&L, volume and win-rate across Hyperliquid. Rewards are
                distributed weekly
              </p>
            </div>
            <div className="">
              <button className="px-4  font-semibold text-sm md:text-base py-1.5 md:py-2 rounded-lg bg-[#212d47]">
                last updated
              </button>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 py-5">
            {performance.map((item) => (
              <div
                className="w-[95%] mx-auto md:w-full border border-[#1e2a46] py-3 rounded-lg"
                key={item.id}
              >
                <div className="w-[92%] mx-auto">
                  <h3 className="font-semibold text-sm md:text-base lg:text-lg">
                    {item.title}{" "}
                  </h3>
                  <h3 className="font-semibold text-base md:text-lg pt-1.5">
                    {item.value}{" "}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full  mb-5 ">
            <div className="w-full mx-auto">
              <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto ">
                <table className="min-w-full  ">
                  <thead className="border-b border-b-[#1e2a46] ">
                    <tr>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Rank
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Guild
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        P&L
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Volume
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Win Rate
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
                        <td className="py-2 text-sm md:text-base px-3 font-semibold flex items-center justify-center gap-4">
                          <button className="bg-[#1e2a46] rounded-3xl py-1 px-3 cursor-pointer">
                            view
                          </button>
                          <button className="rounded-3xl py-1 bg-[#6d8cff] text-[#081423] px-4 cursor-pointer">
                            Join
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
