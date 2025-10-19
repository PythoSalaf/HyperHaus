import { useSelector, useDispatch } from "react-redux";
import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import {
  fetchGuildIds,
  fetchGuildData,
  createGuild,
  joinGuild,
} from "../Features/Contract/contractSlice";
import { GridCard } from "../components";
import { entryThresholdeth } from "../utils/formatters";
import { useNavigate } from "react-router-dom";

const Guild = () => {
  const { authenticated, address } = useSelector((state) => state.auth);
  const { guilds, guildIds, status, error } = useSelector(
    (state) => state.contract
  );
  const { wallets } = useWallets();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state for createGuild
  const [guildForm, setGuildForm] = useState({
    creatorName: "",
    guildName: "",
    description: "",
    memberCap: "",
    entryThreshold: "",
    riskThreshold: "",
  });

  useEffect(() => {
    if (authenticated && wallets.length > 0) {
      console.log("User authenticated, fetching guild IDs...");
      dispatch(fetchGuildIds());
    } else {
      console.log("User not authenticated or no wallet, skipping fetch");
    }
  }, [authenticated, wallets, dispatch]);

  useEffect(() => {
    if (authenticated && guildIds.length > 0) {
      console.log("Guild IDs available, fetching guild data:", guildIds);
      dispatch(fetchGuildData(guildIds));
    } else if (guildIds.length === 0) {
      console.log("No guild IDs to fetch data for");
    }
  }, [authenticated, guildIds, dispatch]);

  const handleCreateGuild = async () => {
    if (!authenticated || !address || !wallets[0]) {
      console.error("User not authenticated or wallet not connected");
      return;
    }

    if (
      !guildForm.guildName ||
      !guildForm.description ||
      !guildForm.memberCap ||
      !guildForm.entryThreshold ||
      !guildForm.riskThreshold
    ) {
      console.error("Missing required fields:", guildForm);
      return;
    }

    const guildData = {
      creatorName: guildForm.creatorName || `Creator_${address.slice(0, 6)}`,
      guildName: guildForm.guildName,
      description: guildForm.description,
      memberCap: Number(guildForm.memberCap),
      entryThreshold: BigInt(Number(guildForm.entryThreshold) * 1e18), // Convert ETH to wei
      riskThreshold: Number(guildForm.riskThreshold),
      wallet: wallets[0],
    };

    try {
      console.log("Creating guild with data:", guildData);
      await dispatch(createGuild(guildData)).unwrap();
      console.log("Guild created successfully");
      dispatch(fetchGuildIds());
    } catch (error) {
      console.error("Failed to create guild:", error);
    }
  };

  const handleJoinGuild = async (guildId, entryThreshold) => {
    if (!authenticated || !address || !wallets[0]) {
      console.error("User not authenticated or wallet not connected");
      return;
    }

    try {
      await dispatch(
        joinGuild({
          guildId,
          memberName: `Member_${address.slice(0, 6)}`,
          entryThreshold: entryThreshold || BigInt(0),
          wallet: wallets[0],
        })
      ).unwrap();
      console.log("Joined guild successfully");
      dispatch(fetchGuildIds());
    } catch (error) {
      console.error("Failed to join guild:", error);
    }
  };

  if (!authenticated) {
    return <div className="p-4">Please log in to view guilds.</div>;
  }

  if (status === "loading") {
    return (
      <div className="p-4 flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-4">Error: {error || "Failed to load guild data"}</div>
    );
  }

  return (
    <div className="w-full py-2">
      <div className="w-full hidden md:flex items-center gap-20">
        <h2 className="font-semibold text-lg md:text-xl">Guilds</h2>
        <div className="flex items-center gap-14">
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
            placeholder="Search guild names..."
            className="border border-[#1e2a46] px-3 rounded-lg h-8 md:h-9"
          />
        </div>
        <div>
          <button className="bg-[#5b8eff] px-4 py-1.5 rounded-lg">
            Browse All
          </button>
        </div>
      </div>
      <div className="w-full my-7 border border-[#1e2a46] py-3 rounded-lg">
        <div className="w-[96%] mx-auto">
          <div className="border border-dashed w-full px-4 flex rounded-lg items-center justify-between border-[#1e2a46] py-2">
            <div>
              <h2 className="font-semibold text-sm md:text-lg lg:text-xl">
                Find your trading squad
              </h2>
              <p className="pt-1.5 text-xs md:text-sm lg:text-base">
                Join top-performing guilds or create your own and earn HYPE
                together
              </p>
            </div>
            <div>
              <button
                className="px-4 font-semibold text-sm md:text-base py-1.5 md:py-2 rounded-lg bg-[#212d47]"
                onClick={handleCreateGuild}
              >
                Create Guild
              </button>
            </div>
          </div>
          <div className="py-5">
            <div className="flex items-center justify-between flex-col md:flex-row">
              <h2 className="flex items-center gap-3">
                <span className="bg-[#1e2a46] rounded-2xl px-3 py-0.5 md:py-1.5">
                  Trading
                </span>
                Based on 7d P&L and join rate
              </h2>
              <div className="flex items-center mt-4 mb-1.5 md:mb-0 md:mt-0 gap-x-4">
                <h3 className="border border-[#1e2a46] rounded-lg px-4 py-1">
                  Show: Public
                </h3>
                <h3 className="border border-[#1e2a46] rounded-lg px-4 py-1">
                  Strategy: Any
                </h3>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guilds?.slice(0, 3).map((item) => (
                <GridCard
                  key={item?.guildId}
                  id={item?.guildId}
                  name={item?.guild?.guildName || "Unknown Guild"}
                  description={item?.guild?.descript || "No description"}
                  entryPoint={
                    item?.guild?.entryThreshold
                      ? entryThresholdeth(item.guild.entryThreshold)
                      : "0"
                  }
                  members={item?.guild?.memberNames?.length || 0}
                  onJoin={() =>
                    handleJoinGuild(item.guildId, item?.guild?.entryThreshold)
                  }
                />
              ))}
            </div>
          </div>
          <div className="w-full mb-5 border border-[#1e2a46] py-1.5 rounded-lg">
            <div className="w-[96%] mx-auto">
              <h2 className="font-semibold text-lg md:text-xl">All Guilds</h2>
              <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-b-[#1e2a46]">
                    <tr>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        #
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Guild
                      </th>
                      <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                        Entry Amount
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
                  <tbody className="w-full text-center">
                    {guilds?.map((data, index) => (
                      <tr
                        key={data.guildId}
                        className="w-full border-b border-b-[#1e2a46]"
                      >
                        <td className="py-2 text-sm md:text-base">
                          {index + 1}
                        </td>
                        <td className="py-2 text-sm md:text-base">
                          {data?.guild?.guildName || "Unknown Guild"}
                        </td>
                        <td className="py-2 text-sm md:text-base font-semibold">
                          <div className=" py-1">
                            {data?.guild?.entryThreshold
                              ? entryThresholdeth(data.guild.entryThreshold)
                              : "0"}{" "}
                            HYPE
                          </div>
                        </td>
                        <td className="py-2 text-sm md:text-base">
                          {data?.guild?.memberNames?.length || 0}
                        </td>
                        <td className="py-2 text-sm md:text-base">
                          {data?.guild?.memberCap?.toString() || "0"}
                        </td>
                        <td className="py-2 text-sm md:text-base px-1 font-semibold">
                          <button
                            className="rounded-2xl cursor-pointer py-1 px-4 bg-[#6d8cff] text-[#081423]"
                            onClick={() =>
                              navigate(`/dashboard/guilds/${data.guildId}`)
                            }
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full mb-5 border border-[#1e2a46] py-1.5 rounded-lg">
            <div className="w-[96%] mx-auto">
              <h2 className="font-semibold text-lg md:text-xl">
                Create a Guild
              </h2>
              <div className="my-4 flex items-start flex-col md:flex-row gap-3">
                <div className="border border-[#1e2a46] py-2 rounded-lg w-full">
                  <div className="w-[95%] mx-auto">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Guild Name"
                        value={guildForm.guildName}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            guildName: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-8 md:h-9"
                      />
                    </div>
                    <div className="w-full my-7">
                      <input
                        type="text"
                        placeholder="Creator Name "
                        value={guildForm.creatorName}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            creatorName: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-8 md:h-9"
                      />
                    </div>
                    <div className="w-full ">
                      <textarea
                        placeholder="Guild Description"
                        value={guildForm.description}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-16 md:h-24 pt-2 resize-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-[#1e2a46] py-2 rounded-lg outline-none w-full">
                  <div className="w-[95%] mx-auto">
                    <div className="w-full pb-3">
                      <input
                        type="number"
                        placeholder="Member Cap (e.g., 5)"
                        value={guildForm.memberCap}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            memberCap: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-8 md:h-9"
                      />
                    </div>
                    <div className="w-full py-3">
                      <input
                        type="number"
                        placeholder="Entry Threshold (ETH, e.g., 0.01)"
                        value={guildForm.entryThreshold}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            entryThreshold: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-8 md:h-9"
                      />
                    </div>
                    <div className="w-full py-3">
                      <input
                        type="number"
                        placeholder="Risk Threshold (%, e.g., 50)"
                        value={guildForm.riskThreshold}
                        onChange={(e) =>
                          setGuildForm({
                            ...guildForm,
                            riskThreshold: e.target.value,
                          })
                        }
                        className="w-full border border-[#1e2a46] rounded-lg outline-none px-3 h-8 md:h-9"
                      />
                    </div>
                    <div className="mt-4 mb-2 w-full">
                      <button
                        className="w-full rounded-xl py-2 bg-[#5b8eff] cursor-pointer disabled:opacity-50"
                        onClick={handleCreateGuild}
                        disabled={
                          !guildForm.guildName ||
                          !guildForm.description ||
                          !guildForm.memberCap ||
                          !guildForm.entryThreshold ||
                          !guildForm.riskThreshold
                        }
                      >
                        Create Guild
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guild;
