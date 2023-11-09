import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils";

export function registerCallExecutedEvent() {
  ponder.on("Timelock_CallExecuted:CallExecuted", async ({ event, context }) => {
    const { CallExecuted } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await CallExecuted.create({
      id: `${event.log.id}-CallExecuted`,
      data: {
        callId: event.params.id,
        index: event.params.index,
        target: event.params.target,
        value: event.params.value,
        data: event.params.data,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
