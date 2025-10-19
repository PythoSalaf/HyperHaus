import {
  DashOverview,
  DiscoverGuild,
  GuildPerformance,
  LeaderboardComp,
} from "../components";

const Dashboard = () => {
  return (
    <div className="w-full">
      <DashOverview />
      <GuildPerformance />
      <DiscoverGuild />
      <LeaderboardComp />
    </div>
  );
};

export default Dashboard;
