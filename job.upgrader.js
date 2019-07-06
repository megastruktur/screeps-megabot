var jobUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {


        // Change role if too much energy.
        var spawnName = "Minsk";
        if (Game.spawns[spawnName].energy < Game.spawns[spawnName].energyCapacity) {
            creep.memory.job = "harvester";
        }

        // Change Role
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            creep.memory.job = "builder";
        }

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = jobUpgrader;