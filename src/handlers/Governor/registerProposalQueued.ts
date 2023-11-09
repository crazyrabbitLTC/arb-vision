// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerProposalQueued() {
    ponder.on("OZGovernor_ProposalQueued:ProposalQueued", async ({ event, context }) => {
        const { ProposalQueued_EVENT, } = context.entities;

      const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


        await ProposalQueued_EVENT.create({
            id: `${event.log.id}-ProposalQueued`,
            data: {
                proposalId: event.params.proposalId,
                etaSeconds: event.params.etaSeconds,
                contract: contract.id,
                block: newBlock.id,
                transaction: newTransaction.id,
                log: newLog.id,
            },
        });
    });
}