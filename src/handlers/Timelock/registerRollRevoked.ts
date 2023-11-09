import { ponder } from "@/generated";
import { createCommonEntities } from "../../utils";

export function registerRoleRevokedEvent() {
  ponder.on("Timelock_RoleRevoked:RoleRevoked", async ({ event, context }) => {
    const { RoleRevoked } = context.entities;
  const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await RoleRevoked.create({
      id: `${event.log.id}-RoleRevoked`,
      data: {
        role: event.params.role,
        account: event.params.account,
        sender: event.params.sender,
        contract: contract.id,
        block: newBlock.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  });
}
