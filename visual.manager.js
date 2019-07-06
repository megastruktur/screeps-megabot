var visualManager = {

    run: function () {

        var creepsAmount = _(Game.creeps).filter().size();
        new RoomVisual().text('Creeps amount total: ' + creepsAmount, 1, 1, {align: 'left'});
        new RoomVisual().text('Have a nice day  :)', 1, 2, {align: 'left'});
    }

}


module.exports = visualManager;