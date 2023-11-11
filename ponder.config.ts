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
    {
      name: "L2ArbitrumGovernor_0x0656",
      network: "arbitrum",
      abi: [
        "./abis/TransparentUpgradeableProxy.json",
        "./abis/L2ArbitrumGovernor_0x0656.json",
      ],
      address: "0x789fC99093B09aD01C34DC7251D0C89ce743e5a4",
      startBlock: 70398215,
    },
  ],
};



