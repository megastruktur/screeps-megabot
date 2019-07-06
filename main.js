// @todo Add automatic resource assignment.
// @todo Add Path caching.
// @todo Creep can have only 2 points: Source and Dest.

var GarbageCollector = require("garbage.collector");
var visualManager = require("visual.manager");
var Worker = require("class.worker");
var BirthController = require("birth.controller");
var StructureResourceController = require("structure.resource.controller");


module.exports.loop = function () {
    
    // StructureResourceController.getPositionsAmount();

    visualManager.run();
    BirthController.run();
    GarbageCollector.run();

    for (var creepName in Game.creeps) {

        var creep = Game.creeps[creepName];
        if (creep.memory.job == "harvester") {
            Worker.jobHarvester(creep);
        }
        if (creep.memory.job == "builder") {
            Worker.jobBuilder(creep);
        }
        if (creep.memory.job == "upgrader") {
            Worker.jobUpgrader(creep);
        }

    }

}