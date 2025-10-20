import { Routes, Route } from "react-router-dom";
import {
  DashboardLayout,
  LandingLayout,
  Dashboard,
  Guild,
  Leaderboards,
  GuildDetails,
} from "./pages";
import { AuthManager, ProtectedRoute } from "./components";

function App() {
  return (
    <>
      <AuthManager />
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/guilds" element={<DashboardLayout />}>
            <Route index element={<Guild />} />
            {/* <Route index element={<Dashboard />} /> */}
            <Route
              path="/guilds/:guildId"
              element={<GuildDetails />}
            />
            <Route path="/guilds/leaderboards" element={<Leaderboards />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
