import { useState } from "react";
import { publicClient } from "../utils/viemClient";
import { entryThresholdeth } from "../utils/formatters";
import {formatEther} from 'ethers'

const JoinGuildModal = ({
  isOpen,
  onClose,
  onJoin,
  guildId,
  entryThreshold,
  guildName,
}) => {
  const [memberName, setMemberName] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!memberName) {
      setFormError("Member Name is required");
      return;
    }

    // Check wallet balance
    try {
      setIsLoading(true);
      const balance = await publicClient.getBalance({
        address: window.ethereum.selectedAddress,
      });
      const gasEstimate = BigInt(100000) * BigInt(20000000000); // ~100k gas * 20 gwei
      const totalCost = entryThreshold + formatEther(gasEstimate);
      console.log(
        "Wallet balance:",
        balance.toString(),
        "Total cost:",
        totalCost.toString()
      );
      if (balance < totalCost) {
        setFormError(
          `Insufficient funds: need ~${Number(totalCost) / 1e18} ETH, have ${
            Number(balance) / 1e18
          } HYPE`
        );
        setIsLoading(false);
        return;
      }

      await onJoin(guildId, memberName, entryThreshold);
      setFormError("");
      setMemberName("");
      onClose();
    } catch (error) {
      console.error("Error joining guild:", error);
      setFormError(error.message || "Failed to join guild. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202b46] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Join {guildName}</h2>
        {formError && (
          <div className="text-red-500 text-sm mb-4">{formError}</div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Member Name</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter your member name"
            className="w-full border border-[#dadada] rounded-lg px-3 py-2 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Entry Threshold
          </label>
          <input
            type="text"
            value={entryThresholdeth(entryThreshold)}
            disabled
            className="w-full border border-[#dadada] rounded-lg px-3 py-2 bg-"
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
            className="px-4 py-2 rounded-lg bg-[#5b8eff] text-white disabled:opacity-50"
            disabled={isLoading || !memberName}
          >
            {isLoading ? "Joining..." : "Join Guild"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGuildModal;
