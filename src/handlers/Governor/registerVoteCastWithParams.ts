// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerVoteCastWithParams() {

// VoteCastWithParams_EVENT
ponder.on("OZGovernor_VoteCastWithParams:VoteCastWithParams", async ({ event, context }) => {
  const { VoteCastWithParams_EVENT, } = context.entities;

  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


  await VoteCastWithParams_EVENT.create({
    id: `${event.log.id}-VoteCastWithParams`,
    data: {
      voter: event.params.voter,
      proposalId: event.params.proposalId,
      support: event.params.support,
      weight: event.params.weight,
      reason: event.params.reason,
      params: event.params.params,
      contract: contract.id,
      block: newBlock.id,
      transaction: newTransaction.id,
      log: newLog.id,
    },
  });
});

}