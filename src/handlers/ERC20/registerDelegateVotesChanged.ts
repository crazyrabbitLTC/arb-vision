import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils";
import { getUniqueId } from "../../utils";
import { get } from "http";
export function registerDelegateVotesChangedEvent() {
  
  ponder.on("TransparentUpgradeableProxy:DelegateVotesChanged", async ({ event, context }) => {
    const { DelegateVotesChanged_EVENT } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await DelegateVotesChanged_EVENT.create({
      id: getUniqueId(event, "DelegateVotesChanged"),
      data: {
        delegate: event.params.delegate,
        previousVotes: event.params.previousBalance,
        newVotes: event.params.newBalance,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
