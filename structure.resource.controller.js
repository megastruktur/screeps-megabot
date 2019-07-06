
const Terrain = new Room.Terrain("W16S29");

class StructureResourceController {

    getPositionsAmount() {

        var id = "5bbcac039099fc012e634b16";
        var s = Game.getObjectById(id);
        var positions = {
            1: Terrain.get(s.pos.x - 1, s.pos.y - 1),
            2: Terrain.get(s.pos.x, s.pos.y - 1),
            3: Terrain.get(s.pos.x + 1, s.pos.y - 1),
            4: Terrain.get(s.pos.x - 1, s.pos.y),
            6: Terrain.get(s.pos.x + 1, s.pos.y),
            7: Terrain.get(s.pos.x - 1, s.pos.y + 1),
            8: Terrain.get(s.pos.x, s.pos.y + 1),
            9: Terrain.get(s.pos.x + 1, s.pos.y + 1),
        }

        console.log(positions[0]);

        // for (var ter in positions) {
        //     console.log(positions.ter);
        // }
    }

}

module.exports = new StructureResourceController();