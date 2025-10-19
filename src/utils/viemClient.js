
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  defineChain,
} from "viem";

import {baseSepolia} from 'viem/chains'

const RPC_URL = "https://sepolia.base.org"; 

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(RPC_URL),
});

export const walletClient = async (wallet) => {
  try {
    const provider = await wallet.getEthereumProvider();
    console.log("Privy provider available:", provider);
  
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${(84532).toString(16)}` }], 
      });
    } catch (switchError) {
    
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${(84532).toString(16)}`,
              chainName: "Base Sepolia",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [RPC_URL],
              blockExplorerUrls: [
                "https://base-sepolia.blockscout.com/",
              ], 
            },
          ],
        });
      } else {
        throw switchError;
      }
    }

    const client = createWalletClient({
      chain: baseSepolia,
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
