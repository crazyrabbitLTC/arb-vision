// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerProposalExecuted() {
    // ProposalExecuted_EVENT
    ponder.on("L2ArbitrumGovernor_0x0656:ProposalExecuted", async ({ event, context }) => {
        const { ProposalExecuted_EVENT, } = context.entities;

      const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


        await ProposalExecuted_EVENT.create({
            id: `${event.log.id}-ProposalExecuted`,
            data: {
                proposalId: event.params.proposalId,
                contract: contract.id,
                block: newBlock.id,
                transaction: newTransaction.id,
                log: newLog.id,
            },
        });
    });
}