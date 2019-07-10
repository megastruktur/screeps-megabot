class Worker {

    /**
     * Run a worker program.
     * @param {Creep} creep
     *
     **/
    run(creep) {

        if (creep.memory.job == "harvester") {
            this.jobHarvester(creep);
        }
        if (creep.memory.job == "builder") {
            this.jobBuilder(creep);
        }
        if (creep.memory.job == "upgrader") {
            this.jobUpgrader(creep);
        }
    }

    /**
     * Go and Harvest resource.
     * @param {Creep} creep
     *
     **/
    goAndHarvest(creep) {

        if (creep.memory.harvestObjectId == undefined ||
            creep.memory.harvestObjectId == null ||
            creep.memory.harvestObjectId == "") {
            var sources = creep.room.find(FIND_SOURCES);
            var harvestSource = sources[0];
            creep.memory.harvestObjectId = harvestSource.id;
        }
        else {
            var harvestSource = Game.getObjectById(creep.memory.harvestObjectId)
        }
        if(creep.harvest(harvestSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(harvestSource, {
                visualizePathStyle: {
                    stroke: '#fff'
                }
            });
        }

    }

    
    /**
     * Harvester is needed in the room.
     * Return target ID.
     * @param {Creep} creep
     **/
    harvesterNeeded(creep) {

        var targedId = "";
        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        
        if(targets.length > 0) {
            targedId = targets[0].id;
        }
        return targedId;
    }

    /** @param {Creep} creep **/
    jobHarvester(creep) {

        var spawnName = "Minsk";

        // Change role if too much energy.
        if (Game.spawns[spawnName].energy == Game.spawns[spawnName].energyCapacity) {
            creep.memory.job = "builder";
        }

	    if(creep.carry.energy < creep.carryCapacity) {
            this.goAndHarvest(creep);
        }
        else {
            // Go return the Energy.
            var targetId = this.harvesterNeeded(creep);
            if (targetId != "") {
                var target = Game.getObjectById(targetId);
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
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
            this.goAndHarvest(creep);
	    }
	}

    /** @param {Creep} creep **/
    jobUpgrader(creep) {


        // Change role if too much energy.
        var spawnName = "Minsk";
        
        var targetId = this.harvesterNeeded(creep);
        if (targetId != "") {
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
            this.goAndHarvest(creep);
        }
	}

    /** @param {Creep} creep **/
    // jobChanger(creep) {
        
    //     // Change role if too much energy.
    //     var spawnName = "Minsk";
    //     var spawn = Game.spawns[spawnName];
    //     var job = "harvester";
    //     var activeConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

    //     if (Game.spawns[spawnName].energy < Game.spawns[spawnName].energyCapacity) {
    //         job = "harvester";
    //     } else {

    //     }

    //     // Change Role
    //     if(activeConstructionSites.length) {
    //         job = "builder";
    //     }
        

    //     // Change role if too much energy.
    //     if (spawn.energy == spawn.energyCapacity) {
    //         job = "builder";
    //     }
        
        
    //     if(!activeConstructionSites.length) {
    //         job = "upgrader";
    //     }

    //     creep.memory.job = job;
    // }

}

module.exports = new Worker();