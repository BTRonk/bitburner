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
  //if (getNextHacknetNodeCost() <= currentCash) {
  if (hacknet.getPurchaseNodeCost() <= currentCash) {
    //purchaseHacknetNode();
    hacknet.purchaseNode();
  } else {
  // otherwise, upgrade the nodes where possible
    //for (i = 0; i < hacknetnodes.length; i++) {
    for (i = 0; i < hacknet.numNodes(); i++) {
      // looks like the node = isn't valid with API
      //node = hacknetnodes[i];

      //upgradeCost = node.getLevelUpgradeCost(1);
      upgradeCost = hacknet.getLevelUpgradeCost(i, 1);

      if (upgradeCost <= currentCash) {
        //node.upgradeLevel(1);
        hacknet.upgradeLevel(i, 1);
        break;
      } else {
        //ramCost = node.getRamUpgradeCost();
        ramCost = hacknet.getRamUpgradeCost(i, 1);

        if (ramCost <= currentCash) {
          //node.upgradeRam();
          hacknet.upgradeRam(i, 1);
          break;
        } else {
          //coreCost = node.getCoreUpgradeCost();
          coreCost = hacknet.getCoreUpgradeCost(i, 1);

          if (coreCost <= currentCash) {
            //node.upgradeCore();
            hacknet.upgradeCore(i, 1);
            break;
          }
        }
      }
    }
  }
}
