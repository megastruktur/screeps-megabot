class Utility {

    getTotalEnergy(spawn, capacity = 'energy') {

        var totalEnergyBalance = 0;
        var extensions = spawn.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var totalEnergyBalance = 0;
        for (let i = 0; i < extensions.length; i++) {
            totalEnergyBalance += extensions[i][capacity];
        }
        totalEnergyBalance += spawn[capacity];

        return totalEnergyBalance;
    }

}

module.exports = new Utility();