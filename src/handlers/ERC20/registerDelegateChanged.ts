import { ponder } from "@/generated";
import { createCommonEntities, getUniqueId } from "../../utils";

export function registerDelegateChangedEvent() {
  ponder.on("TransparentUpgradeableProxy:DelegateChanged", async ({ event, context }) => {
    const { DelegateChanged_EVENT } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await DelegateChanged_EVENT.create({
      id: getUniqueId(event, "DelegateChanged"),
      data: {
        delegator: event.params.delegator,
        fromDelegate: event.params.fromDelegate,
        toDelegate: event.params.toDelegate,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
