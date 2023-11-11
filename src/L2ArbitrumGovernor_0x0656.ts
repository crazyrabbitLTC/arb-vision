
import { ponder } from "@/generated";
import { registerProposalCanceled } from "./handlers/Governor/registerProposalCanceled";
import { registerProposalCreated } from "./handlers/Governor/registerProposalCreated";
import { registerProposalExecuted } from "./handlers/Governor/registerProposalExecuted";
import { registerProposalQueued } from "./handlers/Governor/registerProposalQueued";
import { registerVoteCast } from "./handlers/Governor/registerVoteCast";
import { registerVoteCastWithParams } from "./handlers/Governor/registerVoteCastWithParams";
import { registerVotingDelaySet } from "./handlers/Governor/registerVotingDelaySet";
import { registerVotingPeriodSet } from "./handlers/Governor/registerVotingPeriodSet";
import { registerTimelockChange } from "./handlers/Governor/registerTimelockChange";
import { registerQuorumNumeratorUpdated } from "./handlers/Governor/registerQuorumNumeratorUpdated";
import { registerProposalThresholdSet } from "./handlers/Governor/registerProposalThresholdSet";

registerProposalCanceled();
registerProposalCreated();
registerProposalExecuted();
registerProposalQueued();
registerVoteCast();
registerVoteCastWithParams();
registerVotingDelaySet();
registerVotingPeriodSet();
registerTimelockChange();
registerQuorumNumeratorUpdated();
registerProposalThresholdSet();
 



