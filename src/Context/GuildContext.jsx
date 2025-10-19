import { createContext, useState, useEffect } from "react";
import { createPublicClient, http } from "viem";
import { sepolia, baseSepolia } from "viem/chains";
import { contractABI, contractAddress } from "../components/contractConfig";

// Create the Guild Context
export const GuildContext = createContext();

// Initialize the public client
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// Guild Provider Component
export const GuildProvider = ({ children }) => {
  const [guildIds, setGuildIds] = useState([]);
  const [guildsArray, setGuilds] = useState([]);

  // Fetch Guild IDs
  useEffect(() => {
    const guildIIDFuction = async () => {
      try {
        const guild_IDS = await publicClient.readContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "GuildIds",
        });

        setGuildIds(guild_IDS);
        console.log("The Ids", guild_IDS, "The State", guildIds);
      } catch (error) {
        console.error("Error fetching guild IDs:", error);
      }
    };

    guildIIDFuction();
  }, []);

  // Fetch Guilds based on guildIds
  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        let guilds_Created = [];

        for (let i = 0; i < guildIds.length; i++) {
          const guild = await publicClient.readContract({
            address: contractAddress,
            abi: contractABI,
            functionName: "Guilds",
            args: [guildIds[i]],
          });

          guilds_Created.push(guild);
          console.log("The Guild", guild);
        }

        setGuilds(guilds_Created);
        console.log("The Guilds", guilds_Created);
      } catch (error) {
        console.error("Error fetching guilds:", error);
      }
    };

    if (guildIds.length > 0) {
      fetchGuilds();
    }
  }, [guildIds]);

  // Provide the context value
  const value = {
    guildIds,
    guildsArray,
  };

  return (
    <GuildContext.Provider value={value}>{children}</GuildContext.Provider>
  );
};
