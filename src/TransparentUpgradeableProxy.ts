import { ponder } from "@/generated";
import { registerDelegateChangedEvent } from "./handlers/ERC20/registerDelegateChanged";
import { registerDelegateVotesChangedEvent } from "./handlers/ERC20/registerDelegateVotesChanged";
import { registerOwnershipTransferredEvent } from "./handlers/Proxy/registerOwnershipTransfered";
import { registerTransferEvent } from "./handlers/ERC20/registerTransfer";
import { registerApprovalEvent } from "./handlers/ERC20/registerApprovals";

// token
registerDelegateChangedEvent();
registerDelegateVotesChangedEvent();
registerApprovalEvent();
registerOwnershipTransferredEvent();
// registerTransferEvent();




// ponder.on(
//   "TransparentUpgradeableProxy:Approval",
//   async ({ event, context }) => {
//     console.log(event.params);
//   }
// );

// ponder.on(
//     "TransparentUpgradeableProxy:Transfer(address indexed from, address indexed to, uint256 value)",
//   async ({ event, context }) => {
//     console.log(event.params);
//   }
// );

