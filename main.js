var visualManager = require("visual.manager");
var jobHarvester = require("job.harvester");
var jobBuilder = require("job.builder");
var jobUpgrader = require("job.upgrader");
var BirthController = require("birth.controller");


module.exports.loop = function () {
    
    visualManager.run();
    BirthController.run();

    for (var creepName in Game.creeps) {

        var creep = Game.creeps[creepName];
        if (creep.memory.job == "harvester") {
            jobHarvester.run(creep);
        }
        if (creep.memory.job == "builder") {
            jobBuilder.run(creep);
        }
        if (creep.memory.job == "upgrader") {
            jobUpgrader.run(creep);
        }

    }

}