import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils";

export function registerMinDelayChangeEvent() {
  ponder.on("Timelock_MinDelayChange:MinDelayChange", async ({ event, context }) => {
    const { MinDelayChange } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await MinDelayChange.create({
      id: `${event.log.id}-MinDelayChange`,
      data: {
        oldDuration: event.params.oldDuration,
        newDuration: event.params.newDuration,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
