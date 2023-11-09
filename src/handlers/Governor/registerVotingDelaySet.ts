// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerVotingDelaySet() {

// VotingDelaySet_EVENT
ponder.on("OZGovernor_VotingDelaySet:VotingDelaySet", async ({ event, context }) => {
  const { VotingDelaySet_EVENT, } = context.entities;

  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


  await VotingDelaySet_EVENT.create({
    id: `${event.log.id}-VotingDelaySet`,
    data: {
      oldVotingDelay: event.params.oldVotingDelay,
      newVotingDelay: event.params.newVotingDelay,
      contract: contract.id,
      block: newBlock.id,
      transaction: newTransaction.id,
      log: newLog.id,
    },
  });
});

}