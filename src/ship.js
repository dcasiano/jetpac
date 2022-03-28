export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'spaceship');
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.scene.physics.add.collider(this, player, this.playerCollision, null, this);
        this.fuelNeeded;
        this.fuelReloaded = 0;
    }
    playerCollision() {
        if (this.player.isFuelGrabbed()) {
            this.player.dropFuel();
            this.fuelReloaded++;
            this.scene.oneFuelReloaded();
        }
    }
    allFuelReloaded() {
        return this.fuelReloaded >= this.fuelNeeded;
    }
    setFuelNeeded(amount) {
        this.fuelNeeded = amount;
    }
}