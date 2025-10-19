import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#0f1724] text-white py-4">
      <div className="w-[95%] mx-auto md:w-[92%] flex flex-col items-center justify-center">
        <h2 className="flex items-center gap-x-1 text-xs md:text-sm lg:text-base">
          <FaRegCopyright />
          2025 HyperHaus, Built for Hyperliquid traders and teams.
        </h2>
      </div>
    </div>
  );
};

export default Footer;
