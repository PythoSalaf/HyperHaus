const DashOverview = () => {
  return (
    <div className="w-full bg-[#0e1623] border border-[#1e2a46] rounded-lg pt-1 pb-2">
      <div className="w-[98%] mx-auto">
        <h2 className="font-semibold text-lg md:text-xl">Overview</h2>
        <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
          <div className="w-[96%] md:w-full mx-auto  bg-[#0b1320] border border-[#1e2a46] rounded-lg py-2">
            <div className="w-[92%] mx-auto">
              <h3 className="text-sm md:text-base font-semibold">
                Guild P&L (7d)
              </h3>
              <h3 className="font-semibold py-1 md:py-1.5 text-base md:text-lg lg:text-xl">
                +$12,340
              </h3>
              <h3 className="text-green-800 text-sm font-semibold">+8.5%</h3>
            </div>
          </div>
          <div className="w-[94%] md:w-full mx-auto  bg-[#0b1320] border border-[#1e2a46] rounded-lg py-2">
            <div className="w-[92%] mx-auto">
              <h3 className="text-sm md:text-base font-semibold">
                Your Contribution
              </h3>
              <h3 className="font-semibold py-1 md:py-1.5 text-base md:text-lg lg:text-xl">
                +$3,340
              </h3>
              <h3 className="text-gray-600 text-sm font-semibold">Rank #12</h3>
            </div>
          </div>
          <div className="w-[94%] md:w-full mx-auto  bg-[#0b1320] border border-[#1e2a46] rounded-lg py-2">
            <div className="w-[92%] mx-auto">
              <h3 className="text-sm md:text-base font-semibold">HYPE Earn</h3>
              <h3 className="font-semibold py-1 md:py-1.5 text-base md:text-lg lg:text-xl">
                4,340
              </h3>
              <h3 className="text-gray-600 text-sm font-semibold">Rank #12</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashOverview;
