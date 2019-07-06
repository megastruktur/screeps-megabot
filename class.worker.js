class Worker {

    /** @param {Creep} creep **/
    jobHarvester(creep) {

        var spawnName = "Minsk";

        // Change role if too much energy.
        if (Game.spawns[spawnName].energy == Game.spawns[spawnName].energyCapacity) {
            creep.memory.job = "builder";
        }

	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: {
                        stroke: '#fff'
                    }
                });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

    /** @param {Creep} creep **/
    jobBuilder(creep) {

        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(!targets.length) {
            creep.memory.job = "upgrader";
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}

    /** @param {Creep} creep **/
    jobUpgrader(creep) {


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

    /** @param {Creep} creep **/
    jobChanger(creep) {
        
        // Change role if too much energy.
        var spawnName = "Minsk";
        var spawn = Game.spawns[spawnName];
        var job = "harvester";
        var activeConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (Game.spawns[spawnName].energy < Game.spawns[spawnName].energyCapacity) {
            job = "harvester";
        } else {

        }

        // Change Role
        if(activeConstructionSites.length) {
            job = "builder";
        }
        

        // Change role if too much energy.
        if (spawn.energy == spawn.energyCapacity) {
            job = "builder";
        }
        
        
        if(!activeConstructionSites.length) {
            job = "upgrader";
        }

        creep.memory.job = job;
    }

}

module.exports = new Worker();