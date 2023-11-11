import { ponder } from "@/generated";
import { createCommonEntities, findOrCreateAddress } from "../../utils";
import { getUniqueId } from "../../utils";
export function registerDelegateVotesChangedEvent() {
  
  ponder.on("TransparentUpgradeableProxy:DelegateVotesChanged", async ({ event, context }) => {
    const { DelegateVotesChanged_EVENT } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

  console.log(event.params);
  
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

    const receipient = await findOrCreateAddress(event.params.delegate, context);

    // Update the address with the new balance
    await context.entities.Address.update({
        id: receipient.id,
      data: {
        voting_power: event.params.newBalance,
      },
    });

  });
}
