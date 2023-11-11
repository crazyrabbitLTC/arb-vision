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
registerTransferEvent();


