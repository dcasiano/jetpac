export default class Meteor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, player) {
        super(scene, x, y, 'fuel');
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, platforms);
        this.scene.physics.add.collider(this, player, this.playerGrab, null, this);
        this.isGrabbed = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.walkSpeed = 100, this.jumpSpeed = 150;
        this.levelWidth = 256;
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.isGrabbed) {
            this.x = this.player.getX();
            this.y = this.player.getY();
            let velocityX = 0, velocityY = 0;
            if (this.cursors.up.isDown) {
                velocityY = -this.jumpSpeed;
            }
            if (this.cursors.left.isDown) {
                velocityX -= this.walkSpeed;
            }
            if (this.cursors.right.isDown) {
                velocityX += this.walkSpeed;
            }
            this.body.setVelocity(velocityX, velocityY);
            if (this.x < 0) this.x = this.levelWidth;
            else if (this.x > this.levelWidth) this.x = 0;
        }


    }
    playerGrab() {
        this.isGrabbed = true;
        this.player.grabFuel();
    }
    toDestroy() {
        this.destroy();
    }
}