// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerProposalQueued() {
    ponder.on("L2ArbitrumGovernor_0x0656:ProposalQueued", async ({ event, context }) => {
        const { ProposalQueued_EVENT, } = context.entities;

      const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


        await ProposalQueued_EVENT.create({
            id: `${event.log.id}-ProposalQueued`,
            data: {
                proposalId: event.params.proposalId,
                eta: event.params.eta,
                contract: contract.id,
                block: newBlock.id,
                transaction: newTransaction.id,
                log: newLog.id,
            },
        });
    });
}