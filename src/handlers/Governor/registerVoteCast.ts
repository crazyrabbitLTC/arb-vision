// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities, findOrCreateAddress, getUniqueId } from "../../utils"; // Adjust the import path as necessary

export function registerVoteCast() {

  // VoteCast_EVENT
  ponder.on("L2ArbitrumGovernor_0x0656:VoteCast", async ({ event, context }) => {
    const { VoteCast_EVENT, Vote } = context.entities;

    const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    const voter = await findOrCreateAddress(event.params.voter, context)

    // create vote
    await Vote.create({
      id: getUniqueId(event, "-vote"),
      data: {
        contract: contract.id,
        choice: event.params.support,
        reason: event.params.reason,
        weight: event.params.weight,
        voter: voter.id,
        proposal: event.params.proposalId
      }
    })

    // create event
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