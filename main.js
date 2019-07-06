// @todo Garbage Collector for memory.
// @todo Add automatic resource assignment.
// @todo Add Path caching.

var visualManager = require("visual.manager");
var Worker = require("class.worker");
var BirthController = require("birth.controller");


module.exports.loop = function () {
    
    visualManager.run();
    BirthController.run();

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