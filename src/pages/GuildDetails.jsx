// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { useWallets } from "@privy-io/react-auth";
// import {
//   joinGuild,
//   topUpStake,
//   proposeTrade,
//   voteProposal,
//   executeProposal,
//   withdrawStake,
//   fetchGuildData,
// } from "../Features/Contract/contractSlice";
// import { Chat, JoinGuildModal } from "../components";
// import { entryThresholdeth } from "../utils/formatters";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");

// // Modals (unchanged: TopUpStakeModal, ProposeTradeModal, VoteProposalModal)
// const TopUpStakeModal = ({ isOpen, onClose, onTopUp, guildId }) => {
//   const [amount, setAmount] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!amount || Number(amount) <= 0) {
//       setFormError("Amount must be greater than 0 ETH");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await onTopUp(guildId, BigInt(Number(amount) * 1e18));
//       setFormError("");
//       setAmount("");
//       onClose();
//     } catch (error) {
//       console.error("Error topping up stake:", error);
//       setFormError(error.message || "Failed to top up stake");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-[#1e2a46] rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Top Up Stake</h2>
//         {formError && (
//           <div className="text-red-500 text-sm mb-4">{formError}</div>
//         )}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Amount (ETH)</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount in ETH"
//             className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none"
//           />
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-300 text-black"
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 rounded-lg bg-[#1e2a46] border border-[#dadada] text-white disabled:opacity-50"
//             disabled={isLoading || !amount}
//           >
//             {isLoading ? "Topping Up..." : "Top Up Stake"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProposeTradeModal = ({
//   isOpen,
//   onClose,
//   onPropose,
//   guildId,
//   riskThreshold,
//   pool,
// }) => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [formError, setFormError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const maxAmount = (Number(riskThreshold) * Number(pool)) / 100;

//   const handleSubmit = async () => {
//     if (!amount || Number(amount) <= 0) {
//       setFormError("Amount must be greater than 0 ETH");
//       return;
//     }
//     if (!description) {
//       setFormError("Description is required");
//       return;
//     }
//     if (Number(amount) > maxAmount / 1e18) {
//       setFormError(
//         `Amount exceeds risk threshold (${entryThresholdeth(maxAmount)} ETH)`
//       );
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const proposal = await onPropose(
//         guildId,
//         BigInt(Number(amount) * 1e18),
//         description
//       );
//       socket.emit("newProposal", proposal, guildId);
//       setFormError("");
//       setAmount("");
//       setDescription("");
//       onClose();
//     } catch (error) {
//       console.error("Error proposing trade:", error);
//       setFormError(error.message || "Failed to propose trade");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-transparents bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-[#1e2a46] shadow rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Propose Trade</h2>
//         {formError && (
//           <div className="text-red-500 text-sm mb-4">{formError}</div>
//         )}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">
//             Amount (HYPE)
//           </label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder={`Max ${entryThresholdeth(maxAmount)} HYPE`}
//             className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe the trade"
//             className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none h-20 resize-none"
//           />
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-300 text-black"
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 rounded-lg bg-[#1e2a46] border border-[#dadada] text-white disabled:opacity-50"
//             disabled={isLoading || !amount || !description}
//           >
//             {isLoading ? "Proposing..." : "Propose Trade"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VoteProposalModal = ({
//   isOpen,
//   onClose,
//   onVote,
//   guildId,
//   proposalId,
// }) => {
//   const [voteYes, setVoteYes] = useState(true);
//   const [formError, setFormError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);
//       await onVote(guildId, proposalId, voteYes);
//       socket.emit(
//         "newVote",
//         {
//           proposalId,
//           voteYes,
//           voter: useSelector((state) => state.auth.address),
//         },
//         guildId
//       );
//       setFormError("");
//       onClose();
//     } catch (error) {
//       console.error("Error voting on proposal:", error);
//       setFormError(error.message || "Failed to vote on proposal");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Vote on Proposal</h2>
//         {formError && (
//           <div className="text-red-500 text-sm mb-4">{formError}</div>
//         )}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Vote</label>
//           <select
//             value={voteYes}
//             onChange={(e) => setVoteYes(e.target.value === "true")}
//             className="w-full border border-[#1e2a46] rounded-lg px-3 py-2 outline-none"
//           >
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-300 text-black"
//             disabled={isLoading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 rounded-lg bg-[#1e2a46] text-white disabled:opacity-50"
//             disabled={isLoading}
//           >
//             {isLoading ? "Voting..." : "Submit Vote"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GuildDetails = () => {
//   const { guildId } = useParams();
//   const { authenticated, address } = useSelector((state) => state.auth);
//   const { guilds, status, error } = useSelector((state) => state.contract);
//   const { wallets } = useWallets();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const guildData = guilds.find((g) => g.guildId === guildId);
//   const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
//   const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
//   const [isProposeTradeModalOpen, setIsProposeTradeModalOpen] = useState(false);
//   const [isVoteProposalModalOpen, setIsVoteProposalModalOpen] = useState(false);
//   const [selectedProposalId, setSelectedProposalId] = useState(null);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     if (authenticated && guildId) {
//       console.log("Fetching guild data for:", guildId);
//       dispatch(fetchGuildData([guildId]));
//     }
//     if (!guildData) {
//       console.warn("Guild not found for ID:", guildId);
//     } else {
//       console.log("Guild data:", guildData);
//     }
//   }, [guildData, guildId, authenticated, dispatch]);

//   const handleJoinGuild = async (guildId, memberName, entryThreshold) => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to join a guild");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Joining guild with data:", {
//         guildId,
//         memberName,
//         entryThreshold,
//       });
//       await dispatch(
//         joinGuild({
//           guildId,
//           memberName,
//           entryThreshold: entryThreshold || BigInt(0),
//           wallet: wallets[0],
//         })
//       ).unwrap();
//       console.log("Joined guild successfully");
//       setFormError("");
//       setIsJoinModalOpen(false);
//       dispatch(fetchGuildData([guildId]));
//     } catch (error) {
//       console.error("Failed to join guild:", error);
//       setFormError(error.message || "Failed to join guild");
//     }
//   };

//   const handleTopUpStake = async (guildId, amount) => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to top up stake");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Topping up stake:", { guildId, amount });
//       await dispatch(
//         topUpStake({ guildId, amount, wallet: wallets[0] })
//       ).unwrap();
//       console.log("Stake topped up successfully");
//       setFormError("");
//       dispatch(fetchGuildData([guildId]));
//     } catch (error) {
//       console.error("Failed to top up stake:", error);
//       setFormError(error.message || "Failed to top up stake");
//     }
//   };

//   const handleProposeTrade = async (guildId, amount, description) => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to propose a trade");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Proposing trade:", { guildId, amount, description });
//       const result = await dispatch(
//         proposeTrade({ guildId, amount, description, wallet: wallets[0] })
//       ).unwrap();
//       console.log("Trade proposed successfully");
//       setFormError("");
//       dispatch(fetchGuildData([guildId]));
//       return result; // Return proposal data for socket broadcast
//     } catch (error) {
//       console.error("Failed to propose trade:", error);
//       setFormError(error.message || "Failed to propose trade");
//       throw error;
//     }
//   };

//   const handleVoteProposal = async (guildId, proposalId, voteYes) => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to vote on a proposal");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Voting on proposal:", { guildId, proposalId, voteYes });
//       await dispatch(
//         voteProposal({ guildId, proposalId, voteYes, wallet: wallets[0] })
//       ).unwrap();
//       console.log("Voted successfully");
//       setFormError("");
//       dispatch(fetchGuildData([guildId]));
//     } catch (error) {
//       console.error("Failed to vote on proposal:", error);
//       setFormError(error.message || "Failed to vote on proposal");
//       throw error;
//     }
//   };

//   const handleExecuteProposal = async (proposalId) => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to execute a proposal");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Executing proposal:", proposalId);
//       await dispatch(
//         executeProposal({ proposalId, wallet: wallets[0], guildId })
//       ).unwrap();
//       console.log("Proposal executed successfully");
//       setFormError("");
//       socket.emit("proposalExecuted", { proposalId }, guildId);
//       dispatch(fetchGuildData([guildId]));
//     } catch (error) {
//       console.error("Failed to execute proposal:", error);
//       setFormError(error.message || "Failed to execute proposal");
//       throw error;
//     }
//   };

//   const handleWithdrawStake = async () => {
//     if (!authenticated || !address || !wallets[0]) {
//       setFormError("Please connect your wallet to withdraw stake");
//       console.error("User not authenticated or wallet not connected");
//       return;
//     }

//     try {
//       console.log("Withdrawing stake:", guildId);
//       await dispatch(withdrawStake({ guildId, wallet: wallets[0] })).unwrap();
//       console.log("Stake withdrawn successfully");
//       setFormError("");
//       navigate("/guilds");
//     } catch (error) {
//       console.error("Failed to withdraw stake:", error);
//       setFormError(error.message || "Failed to withdraw stake");
//     }
//   };

//   const openJoinModal = () => {
//     setIsJoinModalOpen(true);
//   };

//   const closeJoinModal = () => {
//     setIsJoinModalOpen(false);
//     setFormError("");
//   };

//   const openTopUpModal = () => {
//     setIsTopUpModalOpen(true);
//   };

//   const closeTopUpModal = () => {
//     setIsTopUpModalOpen(false);
//     setFormError("");
//   };

//   const openProposeTradeModal = () => {
//     setIsProposeTradeModalOpen(true);
//   };

//   const closeProposeTradeModal = () => {
//     setIsProposeTradeModalOpen(false);
//     setFormError("");
//   };

//   const openVoteProposalModal = (proposalId) => {
//     setSelectedProposalId(proposalId);
//     setIsVoteProposalModalOpen(true);
//   };

//   const closeVoteProposalModal = () => {
//     setIsVoteProposalModalOpen(false);
//     setSelectedProposalId(null);
//     setFormError("");
//   };

//   if (!authenticated) {
//     return <div className="p-4">Please log in to view guild details.</div>;
//   }

//   // if (status === "loading") {
//   //   return <div className="p-4">Loading...</div>;
//   // }

//   if (status === "failed") {
//     return (
//       <div className="p-4">Error: {error || "Failed to load guild data"}</div>
//     );
//   }

//   if (!guildData) {
//     return <div className="p-4">Guild not found for ID: {guildId}</div>;
//   }

//   const { guild, proposals } = guildData;
//   const isMember = guild.memberAddresses
//     ?.map((addr) => addr.toLowerCase())
//     .includes(address?.toLowerCase());

//   return (
//     <div className="w-full py-3">
//       <JoinGuildModal
//         isOpen={isJoinModalOpen}
//         onClose={closeJoinModal}
//         onJoin={handleJoinGuild}
//         guildId={guildId}
//         entryThreshold={guild.entryThreshold || BigInt(0)}
//         guildName={guild.guildName || "Unknown Guild"}
//         wallet={wallets[0]}
//       />
//       <TopUpStakeModal
//         isOpen={isTopUpModalOpen}
//         onClose={closeTopUpModal}
//         onTopUp={handleTopUpStake}
//         guildId={guildId}
//       />
//       <ProposeTradeModal
//         isOpen={isProposeTradeModalOpen}
//         onClose={closeProposeTradeModal}
//         onPropose={handleProposeTrade}
//         guildId={guildId}
//         riskThreshold={guild.risk_threshold}
//         pool={guild.pool}
//       />
//       <VoteProposalModal
//         isOpen={isVoteProposalModalOpen}
//         onClose={closeVoteProposalModal}
//         onVote={handleVoteProposal}
//         guildId={guildId}
//         proposalId={selectedProposalId}
//       />
//       <div className="flex items-center mb-2 justify-between">
//         <h2 className="font-semibold text-lg md:text-xl mb-4">Guild Details</h2>
//         <div className="flex gap-4">
//           {!isMember && (
//             <button
//               className="bg-[#1e2a46] text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
//               onClick={openJoinModal}
//               disabled={!authenticated || !wallets[0]}
//             >
//               Join Guild
//             </button>
//           )}
//           {isMember && (
//             <>
//               <button
//                 className="bg-[#5b8eff] text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
//                 onClick={openTopUpModal}
//                 disabled={!authenticated || !wallets[0]}
//               >
//                 Top Up Stake
//               </button>
//               <button
//                 className="bg-red-600 text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
//                 onClick={handleWithdrawStake}
//                 disabled={!authenticated || !wallets[0]}
//               >
//                 Withdraw Stake
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//       {formError && (
//         <div className="text-red-500 text-sm mb-4">{formError}</div>
//       )}
//       <div className="flex items-center gap-6 justify-between flex-col md:flex-row w-full">
//         <div className="flex items-center justify-between py-2 rounded-lg border border-[#1e2a46] w-full">
//           <div className="w-[92%] mx-auto">
//             <div className="flex items-center justify-between gap-x-2">
//               <h4 className="text-sm">Guild Name:</h4>
//               <h2 className="font-semibold text-lg md:text-xl">
//                 {guild.guildName || "Unknown Guild"}
//               </h2>
//             </div>
//             <div className="flex items-center justify-between py-3">
//               <h4 className="text-sm">Creator:</h4>
//               <h2 className="font-semibold text-lg md:text-xl">
//                 {guild.ownerName || "Unknown"}
//               </h2>
//             </div>
//             <div className="flex items-center justify-between py-3">
//               <h4 className="text-sm">Address:</h4>
//               <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
//                 {guild.ownerAddress
//                   ? `${guild.ownerAddress.slice(
//                       0,
//                       6
//                     )}...${guild.ownerAddress.slice(-4)}`
//                   : "N/A"}
//               </div>
//             </div>
//             <div className="flex items-center justify-between py-3">
//               <h4 className="text-sm">Pool:</h4>
//               <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
//                 {guild.pool ? entryThresholdeth(guild.pool) : "0"} ETH
//               </div>
//             </div>
//             <div className="flex items-center justify-between py-3">
//               <h4 className="text-sm">Risk Threshold:</h4>
//               <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
//                 {guild.risk_threshold ? guild.risk_threshold : "0"}%
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between my-2 py-3 rounded-lg border border-[#1e2a46] w-full">
//           <div className="w-[92%] mx-auto">
//             <h4 className="mb-4 text-base md:text-lg font-semibold">
//               Guild Description
//             </h4>
//             <p className="text-sm font-semibold">
//               {guild.descript || "No description available"}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="my-5 py-2 rounded-lg border border-[#1e2a46] w-full">
//         <div className="w-[96%] mx-auto">
//           <h2 className="font-semibold text-lg md:text-xl">All Members</h2>
//           <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="border-b border-b-[#1e2a46]">
//                 <tr>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     #
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Name
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Address
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Members
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Stake
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Caps
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="w-full text-center">
//                 {guild.memberNames?.map((name, index) => (
//                   <tr
//                     key={index}
//                     className="w-full border-b border-b-[#1e2a46]"
//                   >
//                     <td className="py-2 text-sm md:text-base">{index + 1}</td>
//                     <td className="py-2 text-sm md:text-base">
//                       {name || "Unknown"}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {guild.memberAddresses[index]
//                         ? `${guild.memberAddresses[index].slice(
//                             0,
//                             6
//                           )}...${guild.memberAddresses[index].slice(-4)}`
//                         : "N/A"}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {guild.memberNames.length}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {guild.memberStakes[index]
//                         ? entryThresholdeth(guild.memberStakes[index])
//                         : "0"}{" "}
//                       ETH
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {guild.memberCap ? guild.memberCap.toString() : "0"}
//                     </td>
//                   </tr>
//                 )) || (
//                   <tr>
//                     <td colSpan="6" className="py-2 text-sm md:text-base">
//                       No members found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <div className="my-5 py-2 rounded-lg border border-[#1e2a46] w-full">
//         <div className="w-[96%] mx-auto">
//           <h2 className="font-semibold text-lg md:text-xl">Trade Proposals</h2>
//           <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="border-b border-b-[#1e2a46]">
//                 <tr>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     #
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Trader
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Amount
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Description
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Status
//                   </th>
//                   <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
//                     Votes (Yes/Total)
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="w-full text-center">
//                 {proposals?.map((proposal, index) => (
//                   <tr
//                     key={index}
//                     className="w-full border-b border-b-[#1e2a46]"
//                   >
//                     <td className="py-2 text-sm md:text-base">{index + 1}</td>
//                     <td className="py-2 text-sm md:text-base">
//                       {proposal.trader
//                         ? `${proposal.trader.slice(
//                             0,
//                             6
//                           )}...${proposal.trader.slice(-4)}`
//                         : "N/A"}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {proposal.amount
//                         ? entryThresholdeth(proposal.amount)
//                         : "0"}{" "}
//                       ETH
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {proposal.descript || "No description"}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {proposal.fulfilled
//                         ? "Fulfilled"
//                         : proposal.executed
//                         ? "Executed"
//                         : proposal.approved
//                         ? "Approved"
//                         : "Pending"}
//                     </td>
//                     <td className="py-2 text-sm md:text-base">
//                       {proposal.yesVotes}/{proposal.totalVotes}
//                     </td>
//                   </tr>
//                 )) || (
//                   <tr>
//                     <td colSpan="6" className="py-2 text-sm md:text-base">
//                       No trade proposals found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <div className="py-2 rounded-lg border my-2 border-[#1e2a46] w-full">
//         <div className="w-[96%] mx-auto">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-base md:text-lg">
//               Guild Chat Room
//             </h3>
//             <div className="flex items-center gap-x-2">
//               <h3 className="">Members Online:</h3>
//               <h3 className="">{guild.memberNames?.length || 0}</h3>
//             </div>
//           </div>
//           <div className="my-4 w-full py-2 rounded-lg border border-[#1e2a46]">
//             <div className="mx-auto w-[96%]">
//               <h2 className="mb-4">{guild.guildName || "Unknown Guild"}</h2>
//               <Chat
//                 guildId={guildId}
//                 onProposeTrade={openProposeTradeModal}
//                 onVoteProposal={openVoteProposalModal}
//                 onExecuteProposal={handleExecuteProposal}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuildDetails;

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useWallets } from "@privy-io/react-auth";
import {
  joinGuild,
  topUpStake,
  proposeTrade,
  voteProposal,
  executeProposal,
  withdrawStake,
  fetchGuildData,
} from "../Features/Contract/contractSlice";
import { Chat, JoinGuildModal } from "../components";
import { entryThresholdeth } from "../utils/formatters";
import { useEffect, useState } from "react";

// Modals
const TopUpStakeModal = ({ isOpen, onClose, onTopUp, guildId }) => {
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      setFormError("Amount must be greater than 0 ETH");
      return;
    }

    try {
      setIsLoading(true);
      await onTopUp(guildId, BigInt(Number(amount) * 1e18));
      setFormError("");
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Error topping up stake:", error);
      setFormError(error.message || "Failed to top up stake");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e2a46] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Top Up Stake</h2>
        {formError && (
          <div className="text-red-500 text-sm mb-4">{formError}</div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount (HYPE)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in HYPE"
            className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-black"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#1e2a46] border border-[#dadada] text-white disabled:opacity-50"
            disabled={isLoading || !amount}
          >
            {isLoading ? "Topping Up..." : "Top Up Stake"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProposeTradeModal = ({
  isOpen,
  onClose,
  onPropose,
  guildId,
  riskThreshold,
  pool,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const maxAmount = (Number(riskThreshold) * Number(pool)) / 100;

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      setFormError("Amount must be greater than 0 ETH");
      return;
    }
    if (!description) {
      setFormError("Description is required");
      return;
    }
    if (Number(amount) > maxAmount / 1e18) {
      setFormError(
        `Amount exceeds risk threshold (${entryThresholdeth(maxAmount)} ETH)`
      );
      return;
    }

    try {
      setIsLoading(true);
      await onPropose(guildId, BigInt(Number(amount) * 1e18), description);
      setFormError("");
      setAmount("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error proposing trade:", error);
      setFormError(error.message || "Failed to propose trade");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e2a46] shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Propose Trade</h2>
        {formError && (
          <div className="text-red-500 text-sm mb-4">{formError}</div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Amount (HYPE)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Max ${entryThresholdeth(maxAmount)} HYPE`}
            className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the trade"
            className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none h-20 resize-none"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-black"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#1e2a46] border border-[#dadada] text-white disabled:opacity-50"
            disabled={isLoading || !amount || !description}
          >
            {isLoading ? "Proposing..." : "Propose Trade"}
          </button>
        </div>
      </div>
    </div>
  );
};

const VoteProposalModal = ({
  isOpen,
  onClose,
  onVote,
  guildId,
  proposalId,
}) => {
  const [voteYes, setVoteYes] = useState(true);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onVote(guildId, proposalId, voteYes);
      setFormError("");
      onClose();
    } catch (error) {
      console.error("Error voting on proposal:", error);
      setFormError(error.message || "Failed to vote on proposal");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Vote on Proposal</h2>
        {formError && (
          <div className="text-red-500 text-sm mb-4">{formError}</div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vote</label>
          <select
            value={voteYes}
            onChange={(e) => setVoteYes(e.target.value === "true")}
            className="w-full border border-[#1e2a46] rounded-lg px-3 py-2 outline-none"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-black"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#1e2a46] text-white disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Voting..." : "Submit Vote"}
          </button>
        </div>
      </div>
    </div>
  );
};

const GuildDetails = () => {
  const { guildId } = useParams();
  const { authenticated, address } = useSelector((state) => state.auth);
  const { guilds, status, error } = useSelector((state) => state.contract);
  const { wallets } = useWallets();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const guildData = guilds.find((g) => g.guildId === guildId);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isProposeTradeModalOpen, setIsProposeTradeModalOpen] = useState(false);
  const [isVoteProposalModalOpen, setIsVoteProposalModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (authenticated && guildId) {
      dispatch(fetchGuildData([guildId]));
    }
  }, [guildId, authenticated, dispatch]);

  const handleJoinGuild = async (guildId, memberName, entryThreshold) => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to join a guild");
      return;
    }

    try {
      await dispatch(
        joinGuild({
          guildId,
          memberName,
          entryThreshold: entryThreshold || BigInt(0),
          wallet: wallets[0],
        })
      ).unwrap();
      setFormError("");
      setIsJoinModalOpen(false);
      dispatch(fetchGuildData([guildId]));
    } catch (error) {
      // console.error("Failed to join guild:", error);
      // setFormError(error.message || "Failed to join guild");
    }
  };

  const handleTopUpStake = async (guildId, amount) => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to top up stake");
      return;
    }

    try {
      await dispatch(
        topUpStake({ guildId, amount, wallet: wallets[0] })
      ).unwrap();
      setFormError("");
      dispatch(fetchGuildData([guildId]));
    } catch (error) {
      console.error("Failed to top up stake:", error);
      setFormError(error.message || "Failed to top up stake");
    }
  };

  const handleProposeTrade = async (guildId, amount, description) => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to propose a trade");
      return;
    }

    try {
      await dispatch(
        proposeTrade({ guildId, amount, description, wallet: wallets[0] })
      ).unwrap();
      setFormError("");
      dispatch(fetchGuildData([guildId]));
    } catch (error) {
      console.error("Failed to propose trade:", error);
      setFormError(error.message || "Failed to propose trade");
      throw error;
    }
  };

  const handleVoteProposal = async (guildId, proposalId, voteYes) => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to vote on a proposal");
      return;
    }

    try {
      await dispatch(
        voteProposal({ guildId, proposalId, voteYes, wallet: wallets[0] })
      ).unwrap();
      setFormError("");
      dispatch(fetchGuildData([guildId]));
    } catch (error) {
      console.error("Failed to vote on proposal:", error);
      setFormError(error.message || "Failed to vote on proposal");
      throw error;
    }
  };

  const handleExecuteProposal = async (proposalId) => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to execute a proposal");
      return;
    }

    try {
      await dispatch(
        executeProposal({ proposalId, guildId, wallet: wallets[0] })
      ).unwrap();
      setFormError("");
      dispatch(fetchGuildData([guildId]));
    } catch (error) {
      console.error("Failed to execute proposal:", error);
      setFormError(error.message || "Failed to execute proposal");
      throw error;
    }
  };

  const handleWithdrawStake = async () => {
    if (!authenticated || !address || !wallets[0]) {
      setFormError("Please connect your wallet to withdraw stake");
      return;
    }

    try {
      await dispatch(withdrawStake({ guildId, wallet: wallets[0] })).unwrap();
      setFormError("");
      navigate("/guilds");
    } catch (error) {
      console.error("Failed to withdraw stake:", error);
      setFormError(error.message || "Failed to withdraw stake");
    }
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setFormError("");
  };

  const openTopUpModal = () => {
    setIsTopUpModalOpen(true);
  };

  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false);
    setFormError("");
  };

  const openProposeTradeModal = () => {
    setIsProposeTradeModalOpen(true);
  };

  const closeProposeTradeModal = () => {
    setIsProposeTradeModalOpen(false);
    setFormError("");
  };

  const openVoteProposalModal = (proposalId) => {
    setSelectedProposalId(proposalId);
    setIsVoteProposalModalOpen(true);
  };

  const closeVoteProposalModal = () => {
    setIsVoteProposalModalOpen(false);
    setSelectedProposalId(null);
    setFormError("");
  };

  if (!authenticated) {
    return <div className="p-4">Please log in to view guild details.</div>;
  }

  if (status === "failed") {
    return (
      <div className="p-4">Error: {error || "Failed to load guild data"}</div>
    );
  }

  if (!guildData) {
    return <div className="p-4">Guild not found for ID: {guildId}</div>;
  }

  const { guild, proposals } = guildData;
  const isMember = guild.memberAddresses
    ?.map((addr) => addr.toLowerCase())
    .includes(address?.toLowerCase());

  return (
    <div className="w-full py-3">
      <JoinGuildModal
        isOpen={isJoinModalOpen}
        onClose={closeJoinModal}
        onJoin={handleJoinGuild}
        guildId={guildId}
        entryThreshold={guild.entryThreshold || BigInt(0)}
        guildName={guild.guildName || "Unknown Guild"}
        wallet={wallets[0]}
      />
      <TopUpStakeModal
        isOpen={isTopUpModalOpen}
        onClose={closeTopUpModal}
        onTopUp={handleTopUpStake}
        guildId={guildId}
      />
      <ProposeTradeModal
        isOpen={isProposeTradeModalOpen}
        onClose={closeProposeTradeModal}
        onPropose={handleProposeTrade}
        guildId={guildId}
        riskThreshold={guild.risk_threshold}
        pool={guild.pool}
      />
      <VoteProposalModal
        isOpen={isVoteProposalModalOpen}
        onClose={closeVoteProposalModal}
        onVote={handleVoteProposal}
        guildId={guildId}
        proposalId={selectedProposalId}
      />
      <div className="flex items-center mb-2 justify-between">
        <h2 className="font-semibold text-lg md:text-xl mb-4">Guild Details</h2>
        <div className="flex gap-4">
          {!isMember && (
            <button
              className="bg-[#1e2a46] text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
              onClick={openJoinModal}
              disabled={!authenticated || !wallets[0]}
            >
              Join Guild
            </button>
          )}
          {isMember && (
            <>
              <button
                className="bg-[#5b8eff] text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
                onClick={openTopUpModal}
                disabled={!authenticated || !wallets[0]}
              >
                Top Up Stake
              </button>
              <button
                className="bg-red-600 text-sm font-semibold md:text-base rounded-lg py-0.5 md:py-1.5 px-6"
                onClick={handleWithdrawStake}
                disabled={!authenticated || !wallets[0]}
              >
                Withdraw Stake
              </button>
            </>
          )}
        </div>
      </div>
      {formError && (
        <div className="text-red-500 text-sm mb-4">{formError}</div>
      )}
      <div className="flex items-center gap-6 justify-between flex-col md:flex-row w-full">
        <div className="flex items-center justify-between py-2 rounded-lg border border-[#1e2a46] w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between gap-x-2">
              <h4 className="text-sm">Guild Name:</h4>
              <h2 className="font-semibold text-lg md:text-xl">
                {guild.guildName || "Unknown Guild"}
              </h2>
            </div>
            <div className="flex items-center justify-between py-3">
              <h4 className="text-sm">Creator:</h4>
              <h2 className="font-semibold text-lg md:text-xl">
                {guild.ownerName || "Unknown"}
              </h2>
            </div>
            <div className="flex items-center justify-between py-3">
              <h4 className="text-sm">Address:</h4>
              <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
                {guild.ownerAddress
                  ? `${guild.ownerAddress.slice(
                      0,
                      6
                    )}...${guild.ownerAddress.slice(-4)}`
                  : "N/A"}
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <h4 className="text-sm">Pool:</h4>
              <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
                {guild.pool ? entryThresholdeth(guild.pool) : "0"} HYPE
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <h4 className="text-sm">Risk Threshold:</h4>
              <div className="bg-[#1e2a46] rounded-lg py-1 px-4 text-sm md:text-base font-semibold">
                {guild.risk_threshold ? guild.risk_threshold : "0"}%
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between my-2 py-3 rounded-lg border border-[#1e2a46] w-full">
          <div className="w-[92%] mx-auto">
            <h4 className="mb-4 text-base md:text-lg font-semibold">
              Guild Description
            </h4>
            <p className="text-sm font-semibold">
              {guild.descript || "No description available"}
            </p>
          </div>
        </div>
      </div>
      <div className="my-5 py-2 rounded-lg border border-[#1e2a46] w-full">
        <div className="w-[96%] mx-auto">
          <h2 className="font-semibold text-lg md:text-xl">All Members</h2>
          <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-b-[#1e2a46]">
                <tr>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    #
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Name
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Address
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Members
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Stake
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Caps
                  </th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {guild.memberNames?.map((name, index) => (
                  <tr
                    key={index}
                    className="w-full border-b border-b-[#1e2a46]"
                  >
                    <td className="py-2 text-sm md:text-base">{index + 1}</td>
                    <td className="py-2 text-sm md:text-base">
                      {name || "Unknown"}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {guild.memberAddresses[index]
                        ? `${guild.memberAddresses[index].slice(
                            0,
                            6
                          )}...${guild.memberAddresses[index].slice(-4)}`
                        : "N/A"}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {guild.memberNames.length}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {guild.memberStakes[index]
                        ? entryThresholdeth(guild.memberStakes[index])
                        : "0"}{" "}
                      HYPE
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {guild.memberCap ? guild.memberCap.toString() : "0"}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="6" className="py-2 text-sm md:text-base">
                      No members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-5 py-2 rounded-lg border border-[#1e2a46] w-full">
        <div className="w-[96%] mx-auto">
          <h2 className="font-semibold text-lg md:text-xl">Trade Proposals</h2>
          <div className="w-full my-4 border border-[#1e2a46] rounded-lg py-2 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-b-[#1e2a46]">
                <tr>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    #
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Trader
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Amount
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Description
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Status
                  </th>
                  <th className="pb-2 text-sm md:text-base lg:text-lg font-semibold">
                    Votes (Yes/Total)
                  </th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {proposals?.map((proposal, index) => (
                  <tr
                    key={index}
                    className="w-full border-b border-b-[#1e2a46]"
                  >
                    <td className="py-2 text-sm md:text-base">{index + 1}</td>
                    <td className="py-2 text-sm md:text-base">
                      {proposal.trader
                        ? `${proposal.trader.slice(
                            0,
                            6
                          )}...${proposal.trader.slice(-4)}`
                        : "N/A"}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {proposal.amount
                        ? entryThresholdeth(proposal.amount)
                        : "0"}{" "}
                      ETH
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {proposal.descript || "No description"}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {proposal.fulfilled
                        ? "Fulfilled"
                        : proposal.executed
                        ? "Executed"
                        : proposal.approved
                        ? "Approved"
                        : "Pending"}
                    </td>
                    <td className="py-2 text-sm md:text-base">
                      {proposal.yesVotes}/{proposal.totalVotes}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="6" className="py-2 text-sm md:text-base">
                      No trade proposals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="py-2 rounded-lg border my-2 border-[#1e2a46] w-full">
        <div className="w-[96%] mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base md:text-lg">
              Guild Chat Room
            </h3>
            <div className="flex items-center gap-x-2">
              <h3 className="">Members Online:</h3>
              <h3 className="">{guild.memberNames?.length || 0}</h3>
            </div>
          </div>
          <div className="my-4 w-full py-2 rounded-lg border border-[#1e2a46]">
            <div className="mx-auto w-[96%]">
              <h2 className="mb-4">{guild.guildName || "Unknown Guild"}</h2>
              <Chat
                guildId={guildId}
                onProposeTrade={openProposeTradeModal}
                onVoteProposal={openVoteProposalModal}
                onExecuteProposal={handleExecuteProposal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildDetails;
