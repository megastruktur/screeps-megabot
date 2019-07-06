var visualManager = {

    run: function () {

        var Utility = require("utility");
        var totalEnergy = Utility.getTotalEnergy(Game.spawns["Minsk"]);

        var creepsAmount = _(Game.creeps).filter().size();
        new RoomVisual().text('Creeps amount total: ' + creepsAmount, 1, 1, {align: 'left'});
        new RoomVisual().text('Total energy: ' + totalEnergy, 1, 2, {align: 'left'});
    }

}


module.exports = visualManager;