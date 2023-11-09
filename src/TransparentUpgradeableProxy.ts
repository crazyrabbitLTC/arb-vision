import { ponder } from "@/generated";

ponder.on(
  "TransparentUpgradeableProxy:Approval",
  async ({ event, context }) => {
    console.log(event.params);
  }
);

ponder.on(
  "TransparentUpgradeableProxy:DelegateChanged",
  async ({ event, context }) => {
    console.log(event.params);
  }
);
