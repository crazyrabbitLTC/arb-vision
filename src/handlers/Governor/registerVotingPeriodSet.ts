// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerVotingPeriodSet() {

// VotingPeriodSet_EVENT
ponder.on("L2ArbitrumGovernor_0x0656:VotingPeriodSet", async ({ event, context }) => {
  const { VotingPeriodSet_EVENT, } = context.entities;

  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


  await VotingPeriodSet_EVENT.create({
    id: `${event.log.id}-VotingPeriodSet`,
    data: {
      oldVotingPeriod: event.params.oldVotingPeriod,
      newVotingPeriod: event.params.newVotingPeriod,
      contract: contract.id,
      block: newBlock.id,
      transaction: newTransaction.id,
      log: newLog.id,
    },
  });
});


}