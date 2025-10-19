import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "../components";

const DashboardLayout = () => {
  return (
    <div className="w-full flex items-start bg-[#0b1320]">
      <div className="bg-[#090f25] hidden md:block md:w-[20%] lg:w-[15%] fixed h-screen border-r border-r-[#1e263a]">
        <div className="w-[85%] mx-auto">
          <Sidebar />
        </div>
      </div>
      <div className="w-full ml-auto md:w-[80%] lg:w-[85%] text-white">
        <div className="w-full border-b border-b-[#1a222f] py-3">
          <div className=" w-[96%] md:w-[96%] mx-auto">
            <Topbar />
          </div>
        </div>
        <div className="w-[96%] mt-3 md:w-[96%] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
