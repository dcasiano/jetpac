export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms) {
        super(scene, x, y, 'jetpac');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Colision entre jugador y plataformas
        this.scene.physics.add.collider(this, platforms);
        // Cursores para el control
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.walkSpeed = 100, this.jumpSpeed = 150;
        this.levelWidth = 256;
        this.fuelGrabbed = false;
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
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
        // Movimiento toroidal
        if (this.x < 0) this.x = this.levelWidth;
        else if (this.x > this.levelWidth) this.x = 0;

    }
    hitByMeteor() {

    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    grabFuel() {
        this.fuelGrabbed = true;
    }
    dropFuel() {
        this, this.fuelGrabbed = false;
    }
    isFuelGrabbed() {
        return this.fuelGrabbed;
    }
}