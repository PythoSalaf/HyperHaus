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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/guilds" element={<Guild />} />
            <Route
              path="/dashboard/guilds/:guildId"
              element={<GuildDetails />}
            />
            <Route path="/dashboard/leaderboards" element={<Leaderboards />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
