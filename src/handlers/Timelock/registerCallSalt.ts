import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils";

export function registerCallSaltEvent() {
  ponder.on("Timelock_CallSalt:CallSalt", async ({ event, context }) => {
    const { CallSalt } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await CallSalt.create({
      id: `${event.log.id}-CallSalt`,
      data: {
        callId: event.params.id,
        salt: event.params.salt,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
