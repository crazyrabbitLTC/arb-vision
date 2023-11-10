import type { Config } from "@ponder/core";
import { http } from "viem";

export const config: Config = {
  networks: [
    {
      name: "arbitrum",
      chainId: 42161,
      pollingInterval: 100,
      maxRpcRequestConcurrency: 1,
      transport: http(process.env.PONDER_RPC_URL_42161),
    },
  ],
  contracts: [
    {
      name: "TransparentUpgradeableProxy",
      network: "arbitrum",
      abi: [
        "./abis/TransparentUpgradeableProxy.json",
        "./abis/L2ArbitrumToken_0xc4ed.json",
      ],
      address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
      startBlock: 70398215,
    },
  ],
};
