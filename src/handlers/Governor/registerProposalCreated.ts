// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerProposalCreated() {

  ponder.on("L2ArbitrumGovernor_0x0656:ProposalCreated", async ({ event, context }) => {
    const { ProposalCreated_EVENT, Action } = context.entities;
  
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);
  
    const proposalEventId = `${event.log.id}-ProposalCreated`
  
      // loop through targets and create Actions for each
      const actions = event.params.targets.map((target, index) => {
        return {
          id: `${event.params.proposalId.toString()}-ActionIndex-${index}-Hash-${event.transaction.hash}`,
          index: index,
          proposalId: proposalEventId,
          target: target,
          value: event.params.values[index],
          signature: event.params.signatures[index],
          calldata: event.params.calldatas[index],
        }
      })
  
      for await (const action of actions) {
        await Action.create({
          id: action.id,
          data: {
            index: action.index,
            proposalId: action.proposalId!,
            target: action.target,
            value: action.value || BigInt(0),
            signature: action.signature || undefined,
            calldata: action.calldata,
          }
        });
      }
    
  
    await ProposalCreated_EVENT.create({
      id: `${event.log.id}-ProposalCreated`,
      data: {
        proposalId: event.params.proposalId,
        proposer: event.params.proposer,
        startBlock: event.params.startBlock,
        endBlock: event.params.endBlock,
        description: event.params.description,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  })

}