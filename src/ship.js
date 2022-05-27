export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'spaceship');
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player, this.playerCollision, null, this);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.setMaxVelocityY(150);
        this.acc = -850;
    }
    playerCollision() {
        if (this.player.isFuelGrabbed()) {
            this.player.dropFuel();
            this.scene.oneFuelReloaded();
        }
    }
    takeoff() {
        this.body.setAccelerationY(this.acc);
    }
}