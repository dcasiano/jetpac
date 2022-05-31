export default class Grippableitem extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, platforms, player, scoreValue) {
        super(scene, x, y, sprite);
        this.player = player;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, platforms);
        this.isGrabbed = false;
        this.body.setMaxVelocityY(150);
        this.scoreValue = scoreValue;
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.isGrabbed) {
            this.x = this.player.getX();
            this.y = this.player.getY();
        }
    }
    playerGrab() {
        if (!this.isGrabbed) {
            this.isGrabbed = true;
            this.body.allowGravity = false;
        }
    }
    playerDrop() {
        this.isGrabbed = false;
        this.body.allowGravity = true;
        this.body.setVelocity(0, 0);
    }
    toDestroy() {
        this.destroy();
    }
    getScoreValue() {
        return this.scoreValue;
    }
    getIsGrabbed() {
        return this.isGrabbed;
    }
}