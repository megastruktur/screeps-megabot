var visualManager = {

    run: function () {

        var Utility = require("utility");
        var totalEnergy = Utility.getTotalEnergy(Game.spawns["Minsk"]);
        var maxEnergy = Utility.getTotalEnergy(Game.spawns["Minsk"], "energyCapacity");

        var creepsAmount = _(Game.creeps).filter().size();
        new RoomVisual().text('Creeps amount total: ' + creepsAmount, 1, 1, {align: 'left'});
        new RoomVisual().text('Energy: ' + totalEnergy + " of " + maxEnergy, 1, 2, {align: 'left'});
    }

}


module.exports = visualManager;