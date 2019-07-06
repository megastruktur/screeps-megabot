/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('job.harvester');
 * mod.thing == 'a thing'; // true
 */

/** @param {Creep} creep **/
var jobHarvester = {
    run: function(creep) {

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
            if(creep.transfer(Game.spawns[spawnName], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[spawnName], {
                    visualizePathStyle: {
                        stroke: '#fff'
                    }
                });
            }
        }
    }
}

module.exports = jobHarvester;