// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerProposalThresholdSet() {
// ProposalThresholdSet_EVENT
ponder.on("L2ArbitrumGovernor_0x0656:ProposalThresholdSet", async ({ event, context }) => {
    const { ProposalThresholdSet_EVENT, } = context.entities;
  
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);
  
  
    await ProposalThresholdSet_EVENT.create({
      id: `${event.log.id}-ProposalThresholdSet`,
      data: {
        oldProposalThreshold: event.params.oldProposalThreshold,
        newProposalThreshold: event.params.newProposalThreshold,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}