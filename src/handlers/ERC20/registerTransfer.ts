import { ponder } from "@/generated";
import { createCommonEntities, getUniqueId } from "../../utils";

export function registerTransferEvent() {
  ponder.on("TransparentUpgradeableProxy:Transfer", async ({ event, context }) => {
    const { Transfer_EVENT } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await Transfer_EVENT.create({
      id: getUniqueId(event, "Transfer"),
      data: {
        from: event.params.from,
        to: event.params.to,
        value: event.params.value,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
