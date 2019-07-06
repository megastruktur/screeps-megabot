var Codes = require("codes");

class BirthController {

    // Set some defaults.
    constructor() {
        this.mainSpawn = "Minsk";
        this.population = _(Game.creeps).filter().size();
        this.populationMax = 6;
        this.bodies = {
            worker: [MOVE, MOVE, CARRY, WORK]
        };
        this.names = {
            worker: "HappyWorker"
        };
        this.populationMatrix = {
            worker: 1
        };
        this.availableClasses = ["worker"];

        this.bodyParts = {
            "MOVE": 50,
            "CARRY": 50,
            "WORK": 100,
            "ATTACK": 80,
            "RANGED_ATTACK": 150,
            "HEAL": 250,
            "TOUGH": 10,
            "CLAIM": 600
        }
    }

    run() {

        if (this.population < this.populationMax) {
            for (var spawnClass in this.availableClasses) {
                this.spawn(this.spawnCandidate(), Game.spawns[this.mainSpawn]);
            }
        }

    }

    /**
     * @param {string} spawnClass 
     * @param {StructureSpawn} spawn 
     */
    spawn(spawnClass, spawn) {

        // Set some defaults.
        if (!Memory.birthAmount) {
            Memory.birthAmount = 0;
        }

        // Pre-assign citizen memory.
        var citizenMemory;
        var currentCitizenNumber = Memory.birthAmount + 1;
        switch (spawnClass) {
            case "worker":
                citizenMemory = {job: "harvester", class: spawnClass};
                break;
        }

        // Spawn only when not already spawning and have sufficient amount of energy.
        var energySufficient = (spawn.energy >= this.countBodyPrice(this.bodies[spawnClass]));
        if (spawn.spawning == null) {

            if (energySufficient) {
                // var result;
                // console.log(this.bodies[spawnClass]);
                // console.log(this.names[spawnClass] + currentCitizenNumber);
                // console.log({memory: citizenMemory});
                var result = spawn.spawnCreep(this.bodies[spawnClass], this.names[spawnClass] + currentCitizenNumber,{memory: citizenMemory});
        
                // Update info on success only!
                if (result == 0) {
                    Memory.birthAmount++;
                }
                else {
                    console.log("SPAWNER: Can not spawn: " + Codes.errors[result]);
                }
            }
            else {
                console.log("SPAWNER: Not Enough Energy");
            }
        }
        else {
            console.log("SPAWNER: already spawning");
        }
    }

    /**
     * Count Body Price.
     * @param {Array} bodyArray 
     */
    countBodyPrice(bodyArray) {

        var totalPrice = 0;
        var arrayLength = bodyArray.length;
        
        for (let i = 0; i < arrayLength; i++) {
            var part = bodyArray[i];            
            totalPrice += this.bodyParts[part.toUpperCase()];
        }
        return totalPrice;
    }

    /**
     * Return the classname of a spawn candidate.
     */
    spawnCandidate() {
        
        var arrayLength = this.availableClasses.length;
        for (let i = 0; i < arrayLength; i++) {
            var spawnClass = this.availableClasses[i];
            var amountOfClass = _(Game.creeps).filter({memory: {class: spawnClass}}).size();
            var citizenSuffice = Math.floor(this.populationMax * this.populationMatrix[spawnClass] - amountOfClass);
            if (citizenSuffice >= 1) {
                return spawnClass;
            }
        }
    }

}

module.exports = new BirthController();