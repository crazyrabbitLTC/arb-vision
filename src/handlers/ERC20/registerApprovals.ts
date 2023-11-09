import { ponder } from "@/generated";
import { createCommonEntities, getUniqueId } from "../../utils";

export function registerApprovalEvent() {
  ponder.on("TransparentUpgradeableProxy:Approval", async ({ event, context }) => {
    const { Approval_EVENT } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await Approval_EVENT.create({
      id: getUniqueId(event, "Approval"),
      data: {
        owner: event.params.owner,
        spender: event.params.spender,
        value: event.params.value,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
