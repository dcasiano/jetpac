export default class Meteor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, player) {
        super(scene, x, y, 'fuel');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, platforms);
        this.scene.physics.add.collider(this, player, this.playerGrab, null, this);
        this.isGrabbed = false;
        this.body.setMaxVelocityY(150);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.walkSpeed = 100, this.jumpSpeed = 150;
        this.levelWidth = 256;
        this.scoreValue = 100;

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
            this.player.grabFuel();
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
}