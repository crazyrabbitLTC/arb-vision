import { Delegation, ponder } from "@/generated";
import { createCommonEntities, findOrCreateCurrentDelegation, getDelegationCurrentId, getUniqueId, findOrCreateAddress } from "../../utils";

export function registerDelegateChangedEvent() {
  ponder.on("TransparentUpgradeableProxy:DelegateChanged", async ({ event, context }) => {
    const { block } = event;
    const { DelegateChanged_EVENT, Delegation } = context.entities;
    const { newBlock, newTransaction, newLog, sender, contract } = await createCommonEntities(event, context);

    // record the event
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

    // Create Addresses for the delegator and the delegates
    let delegatorAddress = await findOrCreateAddress(event.params.delegator, context);
    let fromDelegateAddress = await findOrCreateAddress(event.params.fromDelegate, context);
    let toDelegateAddress = await findOrCreateAddress(event.params.toDelegate, context);


    let currentDelegation;
    let previousDelegation;

    // See if there is a current delegation
    try {
      currentDelegation = await Delegation.findUnique({
        id: getDelegationCurrentId(event.params.delegator, event.params.toDelegate, contract.id),
      });
    } catch (error) {
      console.log(error);
    }

    // if there is no current delegation, create one
    if (!currentDelegation) {
      currentDelegation = findOrCreateCurrentDelegation(event.params.delegator, event.params.fromDelegate, event.params.toDelegate, contract.id, context, block)
    }

    // See if there was a previous delegation only if it is not the same as the current delegation
    if (event.params.fromDelegate !== event.params.toDelegate) {
      try {
        previousDelegation = await Delegation.findUnique({
          id: getDelegationCurrentId(event.params.delegator, event.params.fromDelegate, contract.id),
        })
      } catch (error) {
        console.log(error);
      }

      // If there is a previous delegation, update it with the end date
      if (previousDelegation) {
        await Delegation.update({ id: previousDelegation.id, data: { endBlock: block.number } })
      }
    }

  });
}
