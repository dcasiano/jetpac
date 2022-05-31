import Grippableitem from "./grippableitem.js";
export default class Fuel extends Grippableitem {
    constructor(scene, x, y, platforms, player) {
        super(scene, x, y, 'fuel', platforms, player, 100);
        scene.physics.add.collider(this, player, this.playerGrabFuel, null, this);
        this.player = player;
    }
    playerGrabFuel() {
        if (!super.getIsGrabbed()) {
            super.playerGrab();
            this.player.grabFuel();
        }
    }
}