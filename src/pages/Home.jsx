import { Hero, HowItWork, ReadyGuild, WhyJoin } from "../components";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchGuildData,
  fetchGuildIds,
} from "./../Features/Contract/contractSlice";

const Home = () => {
  const { authenticated } = useSelector((state) => state.auth);
  const { guildIds, guilds } = useSelector((state) => state.contract);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      console.log("User authenticated, fetching guild IDs...");
      dispatch(fetchGuildIds());
    } else {
      console.log("User not authenticated, skipping fetch");
    }
  }, [authenticated, dispatch]);

  useEffect(() => {
    if (authenticated && guildIds.length > 0) {
      console.log("Guild IDs available, fetching guild data:", guildIds);
      dispatch(fetchGuildData(guildIds));
    } else if (guildIds.length === 0) {
      console.log("No guild IDs to fetch data for");
    }
  }, [authenticated, guildIds, dispatch]);
  console.log("Guild Data:", guilds);

  return (
    <>
      <Hero />
      <HowItWork />
      <WhyJoin />
      <ReadyGuild />
    </>
  );
};

export default Home;
