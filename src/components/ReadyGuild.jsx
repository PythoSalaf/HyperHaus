const ReadyGuild = () => {
  return (
    <div className="w-full bg-transparent text-white py-4 md:py-14">
      <div className="w-[95%] mx-auto md:w-[92%]">
        <div className="bg-[#0f1724] rounded-xl w-[95%] md:w-[70%] flex flex-col justify-center items-center lg:w-[60%] py-5 mx-auto">
          <h2 className="font-semibold text-base md:text-lg lg:text-xl">
            Ready to join or start a guild?
          </h2>
          <p className="py-4 text-sm text-center md:text-base">
            Rally a team, trade together on HyperLiquid, and grow your
            collective edge.
          </p>
          <div className="mt-3 ">
            <button className="bg-[#5b8eff] rounded-lg py-1 px-6 md:py-2">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyGuild;
