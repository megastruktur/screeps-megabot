class GarbageCollector {

    constructor() {

        this.cacheClearTimeout = 10000;
    }

    run() {
        if (Memory.cacheCleared == undefined) {
            Memory.cacheCleared = Game.time;
        }

        if (Game.time >= Memory.cacheCleared + this.cacheClearTimeout) {
            this.clearCache();
        }
    }

    clearCache() {
        this.clearDeceasedCreepsMemory();
        console.log("Cache Cleared");
    }

    clearDeceasedCreepsMemory() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
}

module.exports = new GarbageCollector();