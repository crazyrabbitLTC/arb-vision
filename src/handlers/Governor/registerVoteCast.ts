// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerVoteCast() {

// VoteCast_EVENT
ponder.on("Governor:VoteCast", async ({ event, context }) => {
  const { VoteCast_EVENT, } = context.entities;
  console.log(event.params)

  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


  await VoteCast_EVENT.create({
    id: `${event.log.id}-VoteCast`,
    data: {
      voter: event.params.voter,
      proposalId: event.params.proposalId,
      support: event.params.support,
      weight: event.params.weight,
      reason: event.params.reason,
      contract: contract.id,
      block: newBlock.id,
      transaction: newTransaction.id,
      log: newLog.id,
    },
  });
});

}