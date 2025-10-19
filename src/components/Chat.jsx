// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import { useSelector } from "react-redux";
// import { entryThresholdeth } from "../utils/formatters";

// const socket = io("http://localhost:4000");

// const Chat = ({
//   guildId,
//   onProposeTrade,
//   onVoteProposal,
//   onExecuteProposal,
// }) => {
//   const { guilds } = useSelector((state) => state.contract);
//   const { address } = useSelector((state) => state.auth);
//   const guildData = guilds.find((g) => g.guildId === guildId);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const currentUser = address || "You";

//   useEffect(() => {
//     // Join guild room
//     socket.emit("joinGuildRoom", guildId);

//     // Handle text messages
//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, { ...message, type: "text" }]);
//     });

//     // Handle new proposals
//     socket.on("receiveProposal", (proposal) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `proposal-${proposal.proposalId}`,
//           user: proposal.trader,
//           content: `New trade proposed: ${
//             proposal.descript
//           } for ${entryThresholdeth(proposal.amount)} ETH`,
//           type: "proposal",
//           proposalId: proposal.proposalId,
//           trader: proposal.trader,
//           amount: proposal.amount,
//           descript: proposal.descript,
//           yesVotes: proposal.yesVotes,
//           totalVotes: proposal.totalVotes,
//           voters: proposal.voters,
//           approved: proposal.approved,
//           executed: proposal.executed,
//           fulfilled: proposal.fulfilled,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     });

//     // Handle new votes
//     socket.on("receiveVote", ({ proposalId, voteYes, voter }) => {
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.type === "proposal" && msg.proposalId === proposalId
//             ? {
//                 ...msg,
//                 yesVotes: voteYes ? msg.yesVotes + 1 : msg.yesVotes,
//                 totalVotes: msg.totalVotes + 1,
//                 voters: [...msg.voters, voter],
//                 approved:
//                   guildData.guild.memberAddresses.length === 2 &&
//                   voteYes &&
//                   msg.yesVotes + 1 === 2
//                     ? true
//                     : guildData.guild.memberAddresses.length > 2 &&
//                       msg.totalVotes + 1 >
//                         guildData.guild.memberAddresses.length / 2 &&
//                       msg.yesVotes + (voteYes ? 1 : 0) >
//                         (msg.totalVotes + 1) / 2
//                     ? true
//                     : msg.approved,
//               }
//             : msg
//         )
//       );
//     });

//     // Handle executed proposals
//     socket.on("receiveProposalExecuted", ({ proposalId }) => {
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.type === "proposal" && msg.proposalId === proposalId
//             ? {
//                 ...msg,
//                 executed: true,
//                 content: `Trade executed: ${
//                   msg.descript
//                 } for ${entryThresholdeth(msg.amount)} ETH`,
//               }
//             : msg
//         )
//       );
//     });

//     // Cleanup
//     return () => {
//       socket.off("receiveMessage");
//       socket.off("receiveProposal");
//       socket.off("receiveVote");
//       socket.off("receiveProposalExecuted");
//     };
//   }, [guildId, guildData]);

//   useEffect(() => {
//     // Initialize messages with existing proposals
//     if (guildData && guildData.proposals) {
//       const proposalMessages = guildData.proposals.map((proposal) => ({
//         id: `proposal-${proposal.proposalId}`,
//         user: proposal.trader,
//         content: `New trade proposed: ${
//           proposal.descript
//         } for ${entryThresholdeth(proposal.amount)} ETH`,
//         type: "proposal",
//         proposalId: proposal.proposalId,
//         trader: proposal.trader,
//         amount: proposal.amount,
//         descript: proposal.descript,
//         yesVotes: proposal.yesVotes,
//         totalVotes: proposal.totalVotes,
//         voters: proposal.voters,
//         approved: proposal.approved,
//         executed: proposal.executed,
//         fulfilled: proposal.fulfilled,
//         timestamp: new Date().toISOString(),
//       }));
//       setMessages((prev) => [
//         ...prev.filter((m) => m.type !== "proposal"),
//         ...proposalMessages,
//       ]);
//     }
//   }, [guildData]);

//   const sendMessage = () => {
//     if (input.trim()) {
//       const message = { text: input, user: currentUser };
//       socket.emit("sendMessage", message, guildId);
//       setInput("");
//     }
//   };

//   const handleAction = (action, proposalId) => {
//     if (action === "propose") {
//       onProposeTrade();
//     } else if (action === "vote") {
//       onVoteProposal(proposalId);
//     } else if (action === "execute") {
//       if (window.confirm("Execute this trade proposal?")) {
//         onExecuteProposal(proposalId);
//       }
//     }
//   };

//   const isMember = guildData?.guild?.memberAddresses
//     ?.map((addr) => addr.toLowerCase())
//     .includes(currentUser.toLowerCase());

//   return (
//     <div className="py-2 rounded-lg border my-2 flex flex-col border-[#1e2a46] w-full h-72">
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={msg.id || index}
//             className={`mb-2 p-2 rounded-lg max-w-[70%] ${
//               msg.type === "proposal"
//                 ? "bg-gray-100"
//                 : msg.user.toLowerCase() === currentUser.toLowerCase()
//                 ? "bg-blue-600 text-white self-end ml-auto"
//                 : "bg-gray-600 text-white"
//             }`}
//           >
//             <p className="text-xs text-gray-500">
//               {new Date(msg.timestamp).toLocaleTimeString()}
//             </p>
//             {msg.type === "proposal" ? (
//               <>
//                 <p className="font-semibold">{`${msg.user.slice(
//                   0,
//                   6
//                 )}...${msg.user.slice(-4)}`}</p>
//                 <p>{msg.content}</p>
//                 <p className="text-sm">
//                   Status:{" "}
//                   {msg.fulfilled
//                     ? "Fulfilled"
//                     : msg.executed
//                     ? "Executed"
//                     : msg.approved
//                     ? "Approved"
//                     : "Pending"}
//                 </p>
//                 <p className="text-sm">
//                   Votes: {msg.yesVotes}/{msg.totalVotes}
//                 </p>
//                 {isMember && (
//                   <div className="mt-2 flex gap-2">
//                     {!msg.approved &&
//                       !msg.executed &&
//                       !msg.fulfilled &&
//                       !msg.voters.includes(currentUser) && (
//                         <button
//                           className="bg-[#5b8eff] text-white rounded-lg py-1 px-2 text-sm"
//                           onClick={() => handleAction("vote", msg.proposalId)}
//                         >
//                           Vote
//                         </button>
//                       )}
//                     {msg.approved &&
//                       !msg.executed &&
//                       !msg.fulfilled &&
//                       msg.trader.toLowerCase() ===
//                         currentUser.toLowerCase() && (
//                         <button
//                           className="bg-[#2ecc71] text-white rounded-lg py-1 px-2 text-sm"
//                           onClick={() =>
//                             handleAction("execute", msg.proposalId)
//                           }
//                         >
//                           Execute
//                         </button>
//                       )}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <p className="font-semibold">{`${msg.user.slice(
//                   0,
//                   6
//                 )}...${msg.user.slice(-4)}`}</p>
//                 <p>{msg.text}</p>
//               </>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="mt-2 flex px-2 md:px-5">
//         {isMember && (
//           <button
//             className="bg-[#2ecc71] text-white p-2 rounded-l-lg hover:bg-[#27ae60]"
//             onClick={() => handleAction("propose")}
//           >
//             Propose Trade
//           </button>
//         )}
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a trading tip..."
//           className="flex-1 p-2 border border-gray-700 rounded-none focus:outline-none bg-gray-800 text-white"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Features/Contract/contractSlice";
import { entryThresholdeth } from "../utils/formatters";

const Chat = ({
  guildId,
  onProposeTrade,
  onVoteProposal,
  onExecuteProposal,
}) => {
  const dispatch = useDispatch();
  const { guilds } = useSelector((state) => state.contract);
  const { address } = useSelector((state) => state.auth);
  const guildData = guilds.find((g) => g.guildId === guildId);
  const messages = guildData?.messages || [];
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const currentUser = address || "You";

  useEffect(() => {
    if (guildData && guildData.proposals) {
      // Validate and create proposal messages
      const proposalMessages = guildData.proposals
        .filter(
          (proposal) =>
            proposal &&
            proposal.proposalId &&
            proposal.trader &&
            proposal.amount &&
            proposal.descript
        )
        .map((proposal) => ({
          id: `proposal-${proposal.proposalId}`,
          user: proposal.trader,
          content: `New trade proposed: ${
            proposal.descript
          } for ${entryThresholdeth(proposal.amount)} ETH`,
          type: "proposal",
          proposalId: proposal.proposalId,
          trader: proposal.trader,
          amount: proposal.amount.toString(), // Serialize BigInt
          descript: proposal.descript,
          yesVotes: Number(proposal.yesVotes) || 0,
          totalVotes: Number(proposal.totalVotes) || 0,
          voters: proposal.voters || [],
          approved: !!proposal.approved,
          executed: !!proposal.executed,
          fulfilled: !!proposal.fulfilled,
          timestamp: new Date().toISOString(),
        }));

      // Merge proposal messages with existing messages, avoiding duplicates
      const newMessages = [
        ...messages.filter((m) => m.type !== "proposal"),
        ...proposalMessages.filter(
          (pm) => !messages.some((m) => m.id === pm.id)
        ),
      ];

      // Dispatch all new proposal messages
      newMessages
        .filter((msg) => !messages.some((m) => m.id === msg.id))
        .forEach((message) => {
          dispatch(addMessage({ guildId, message }));
        });
    }
  }, [guildData, guildId, dispatch, messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        id: `text-${Date.now()}`,
        text: input,
        user: currentUser,
        type: "text",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ guildId, message }));
      setInput("");
    }
  };

  const handleAction = (action, proposalId) => {
    if (action === "propose") {
      onProposeTrade();
    } else if (action === "vote") {
      onVoteProposal(proposalId);
    } else if (action === "execute") {
      // if (window.confirm("Execute this trade proposal?")) {
        onExecuteProposal(proposalId);
      // }
    }
  };

  const isMember = guildData?.guild?.memberAddresses
    ?.map((addr) => addr.toLowerCase())
    .includes(currentUser.toLowerCase());

  console.log("Messages in Chat:", messages);
  console.log("Guild Data:", guildData);

  return (
    <div className="py-2 rounded-lg border my-2 flex flex-col border-[#1e2a46] w-full h-72">
      <div className="flex-1 overflow-y-auto p-4">
        {messages
          .filter((msg) => msg && msg.type) // Skip invalid messages
          .map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-lg max-w-[50%] ${
                msg.type === "proposal"
                  ? "bg-gray-100"
                  : msg.user.toLowerCase() === currentUser.toLowerCase()
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-600 text-white"
              }`}
            >
              <p className="text-xs text-[#1e2a46]">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
              {msg.type === "proposal" ? (
                <>
                  <p className="font-semibold text-black">{`${msg.user.slice(
                    0,
                    6
                  )}...${msg.user.slice(-4)}`}</p>
                  <p className="text-[#1e2a46]">{msg.content}</p>
                  <p className="text-sm text-[#1e2a46]">
                    Status:{" "}
                    {msg.fulfilled
                      ? "Fulfilled"
                      : msg.executed
                      ? "Executed"
                      : msg.approved
                      ? "Approved"
                      : "Pending"}
                  </p>
                  <p className="text-sm text-[#1e2a46]">
                    Votes: {msg.yesVotes}/{msg.totalVotes}
                  </p>
                  {isMember && (
                    <div className="mt-2 flex gap-2">
                      {!msg.approved &&
                        !msg.executed &&
                        !msg.fulfilled &&
                        !msg.voters.includes(currentUser) && (
                          <button
                            className="bg-[#5b8eff] text-white rounded-lg py-1 px-2 text-sm"
                            onClick={() => handleAction("vote", msg.proposalId)}
                          >
                            Vote
                          </button>
                        )}
                      {msg.approved &&
                        !msg.executed &&
                        !msg.fulfilled &&
                        msg.trader.toLowerCase() ===
                          currentUser.toLowerCase() && (
                          <button
                            className="bg-[#2ecc71] text-white rounded-lg py-1 px-2 text-sm"
                            onClick={() =>
                              handleAction("execute", msg.proposalId)
                            }
                          >
                            Execute
                          </button>
                        )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="font-semibold">{`${msg.user.slice(
                    0,
                    6
                  )}...${msg.user.slice(-4)}`}</p>
                  <p>{msg.text}</p>
                </>
              )}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-2 flex px-2 md:px-5">
        {isMember && (
          <button
            className="bg-[#2ecc71] text-white p-2 rounded-l-lg hover:bg-[#27ae60]"
            onClick={() => handleAction("propose")}
          >
            Propose Trade
          </button>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a trading tip..."
          className="flex-1 p-2 border border-gray-700 rounded-none focus:outline-none bg-gray-800 text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
