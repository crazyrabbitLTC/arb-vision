// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils"; // Adjust the import path as necessary

export function registerTimelockChange() {

// TimelockChange_EVENT
ponder.on("OZGovernor_TimelockChange:TimelockChange", async ({ event, context }) => {
  const { TimelockChange_EVENT, } = context.entities;

  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);


  await TimelockChange_EVENT.create({
    id: `${event.log.id}-TimelockChange`,
    data: {
      oldTimelock: event.params.oldTimelock,
      newTimelock: event.params.newTimelock,
      contract: contract.id,
      block: newBlock.id,
      transaction: newTransaction.id,
      log: newLog.id,
    },
  });
});

}