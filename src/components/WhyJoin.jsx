const WhyJoin = () => {
  const whyList = [
    {
      id: 1,
      title: "Long-Term Rewards",
      description:
        "Aligned incentives with clear vesting schedules that reward resilience and consistency.",
    },
    {
      id: 2,
      title: "Easy to Join",
      description:
        "Frictionless onboarding and simple guild creation so you can start collaborating fast.",
    },
    {
      id: 3,
      title: "Fun and Competitive",
      description:
        "Friendly competition, seasonal challenges, and leaderboards keep the experience lively.",
    },
  ];
  return (
    <div className="w-full bg-[#0f1724] text-white py-4 md:py-8">
      <div className="w-[95%] mx-auto md:w-[92%]">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold">
          Why Join HyperHaus
        </h2>
        <p className="text-center mt-4 text-sm md:text-base lg:text-lg">
          Key advantages that make guild trading engaging and rewarding.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3.5 md:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {whyList.map((item) => (
            <div
              className="w-[95%] mx-auto md:w-full rounded-lg bg-[#0e1a2a] shadow"
              key={item.id}
            >
              <div className="w-[90%] mx-auto py-5">
                <h2 className="text-base md:text-lg font-semibold">
                  {item.title}
                </h2>
                <p className="mt-5 text-xs md:text-sm lg:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyJoin;
