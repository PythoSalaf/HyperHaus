// import { createPublicClient, createWalletClient, custom, http } from "viem";
// import { sepolia } from "viem/chains";

// // Alchemy RPC for read operations
// const RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/f_MQNN-kXFYVKr8d22fwh";

// export const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http(RPC_URL),
// });

// export const walletClient = async (wallet) => {
//   try {
//     const provider = await wallet.getEthereumProvider();
//     console.log("Privy provider available:", !!provider);
//     const client = createWalletClient({
//       chain: sepolia,
//       transport: custom(provider),
//       account: wallet.address,
//     });
//     console.log("WalletClient created with account:", client.account.address);
//     return client;
//   } catch (error) {
//     console.error("Error creating walletClient:", error);
//     throw new Error("Failed to initialize walletClient");
//   }
// };

// // export const contractAddress = "0x7323ad85BFc66b199C13dBD292C49d10052688d2"

import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  defineChain,
} from "viem";

// Define Hyper EVM Testnet chain
export const hyperEvmTestnet = defineChain({
  id: 998,
  name: "HyperEVM Testnet",
  nativeCurrency: {
    name: "HyperEVM Testnet",
    symbol: "HYPE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.hyperliquid-testnet.xyz/evm"], // Replace with actual RPC URL
    },
    public: {
      http: ["https://rpc.hyperliquid-testnet.xyz/evm"], // Replace with actual RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: "HyperEVM Explorer",
      url: "https://purrsec.com/", // Replace with actual explorer URL, if available
    },
  },
  testnet: true,
});

// Hyper EVM Testnet RPC for read operations
const RPC_URL = "https://rpc.hyperliquid-testnet.xyz/evm"; // Replace with actual RPC URL

// Create public client for Hyper EVM Testnet
export const publicClient = createPublicClient({
  chain: hyperEvmTestnet,
  transport: http(RPC_URL),
});

// Create wallet client for Hyper EVM Testnet
export const walletClient = async (wallet) => {
  try {
    const provider = await wallet.getEthereumProvider();
    console.log("Privy provider available:", provider);

    // Optionally, switch the wallet to Hyper EVM Testnet
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${(998).toString(16)}` }], // Chain ID 998 in hex
      });
    } catch (switchError) {
      // If the chain is not added, add it
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${(998).toString(16)}`,
              chainName: "Hyper EVM Testnet",
              nativeCurrency: {
                name: "HyperEVM Testnet",
                symbol: "HYPE",
                decimals: 18,
              },
              rpcUrls: [RPC_URL],
              blockExplorerUrls: [
                "https://purrsec.com/",
              ], // Replace with actual explorer URL
            },
          ],
        });
      } else {
        throw switchError;
      }
    }

    const client = createWalletClient({
      chain: hyperEvmTestnet,
      transport: custom(provider),
      account:wallet
    });

    console.log("WalletClient created with account:", client.account.address);
    return client;
  } catch (error) {
    console.error("Error creating walletClient:", error);
    throw new Error("Failed to initialize walletClient");
  }
};
