import { Footer, Navbar } from "./../components";
import Home from "./Home";

const LandingLayout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default LandingLayout;
