const HowItWork = () => {
  const howList = [
    {
      id: 1,
      step: "Join or create a Guild",
      description:
        "Browse public guilds or spin up your own in minutes. Set rules, and goals to align your team.",
    },
    {
      id: 2,
      step: "Work Together",
      description:
        "Coordinate strategies, share insights, and manage risk as a team to trade smarter.",
    },
    {
      id: 3,
      step: "Earn Rewards",
      description:
        "Earn certain percent of the profit and vest the rest (9-months plan with 3-month wait) designed to reward consistent contributors.",
    },
    {
      id: 4,
      step: "Manage a Team Treasury",
      description:
        "Build a shared treasury with transparent distribution and long-term sustainability via monthly vesting.",
    },
    {
      id: 5,
      step: "Stay Secure with Privy",
      description:
        "Enjoy a smooth, secure onboarding flow powered by privy, keeping your accounts protected.",
    },
    {
      id: 6,
      step: "Track and Compete",
      description:
        "Monitor performance dashboards, climb leaderboards, and compete with other guilds on Hyperliquid",
    },
  ];
  return (
    <div className="w-full bg-transparent text-white py-4 md:py-8">
      <div className="w-[95%] mx-auto md:w-[92%]">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold">
          How It Works
        </h2>
        <p className="text-center mt-4 text-sm md:text-base lg:text-lg">
          Create or join a guild, collaborate with teammates, and unlock
          long-term rewards while staying secure
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3.5 md:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {howList.map((item, index) => (
            <div
              className="w-[95%] mx-auto md:w-full rounded-lg bg-[#0f1724] shadow"
              key={item.id}
            >
              <div className="w-[90%] mx-auto py-5">
                <div className="flex items-center gap-5">
                  <div className="rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-xl font-semibold lg:text-2xl bg-[#0e1a2a]">
                    {index + 1}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {item.step}
                  </h3>
                </div>
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

export default HowItWork;
