/*
  rent.script

  buys Hacknet Nodes when available
  then upgrades them as available

  25-Nov-2018 - reworked for new Hacknet Node API
*/

//1% of current funds, per cycle.
allowancePercentage = 0.01;

while (true) {
  currentCash = getServerMoneyAvailable('home');
  currentCash *= allowancePercentage;

  // if there is enough money (with the percentage taken into consideration)
  // then get a new node
  if (hacknet.getPurchaseNodeCost() <= currentCash) {
    hacknet.purchaseNode();
  } else {
  // otherwise, upgrade the nodes where possible
    for (i = 0; i < hacknet.numNodes(); i++) {
      upgradeCost = hacknet.getLevelUpgradeCost(i, 1);

      if (upgradeCost <= currentCash) {
        hacknet.upgradeLevel(i, 1);
        break;
      } else {
        ramCost = hacknet.getRamUpgradeCost(i, 1);

        if (ramCost <= currentCash) {
          hacknet.upgradeRam(i, 1);
          break;
        } else {
          coreCost = hacknet.getCoreUpgradeCost(i, 1);

          if (coreCost <= currentCash) {
            hacknet.upgradeCore(i, 1);
            break;
          }
        }
      }
    }
  }
}
