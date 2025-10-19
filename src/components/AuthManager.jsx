import { useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useDispatch } from "react-redux";
import { setAuthState, logout } from "../Features/Auth/authSlice";

const AuthManager = () => {
  const { ready, authenticated, logout: privyLogout } = usePrivy();
  const { wallets } = useWallets();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ready) {
      const address =
        authenticated && wallets.length > 0 ? wallets[0].address : null;
      dispatch(setAuthState({ address, authenticated, ready }));
    }
  }, [ready, authenticated, wallets, dispatch]);

  // Handle logout globally
  const handleLogout = async () => {
    try {
      await privyLogout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return null; // This component doesn't render anything
};

export default AuthManager;
