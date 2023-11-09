// eventHandlers.ts
import { ponder } from "@/generated";
import { createCommonEntities, findOrCreateAddress, markAddressAsContract, recordSenderAndContract } from "../../utils"; // Adjust the import path as necessary

export function registerEIP712DomainChanged() {

  ponder.on("OZGovernor_EIP712DomainChanged:EIP712DomainChanged", async ({ event, context }) => {
    const { EIP712DomainChanged_EVENT, Address } = context.entities;

    const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    await EIP712DomainChanged_EVENT.create({
      id: `${event.log.id}-EIP712DomainChanged`,
      data: {
        block: newBlock.id,
        contract: contract.id,
        transaction: newTransaction.id,
        log: newLog.id,
      },
    });
  })


}