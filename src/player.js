export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, levelWidth) {
        super(scene, x, y, 'jetpac');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Colision entre jugador y plataformas
        this.scene.physics.add.collider(this, platforms);
        // Cursores para el control
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.walkSpeed = 100, this.jumpAcc = -850;
        this.levelWidth = levelWidth;
        this.fuelGrabbed = false;
        this.body.setMaxVelocityY(150);

        // Animaciones
        this.scene.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('jetpac', { start: 4, end: 7 }),
            frameRate: 4, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.scene.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('jetpac', { start: 0, end: 3 }),
            frameRate: 4, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });

    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        let velocityX = 0;
        if (this.cursors.up.isDown) {
            this.body.allowGravity = false;
            this.body.setAccelerationY(this.jumpAcc);
        }
        else this.body.allowGravity = true;

        if (this.cursors.left.isDown) {
            velocityX -= this.walkSpeed;
            this.flipX = true;
        }
        if (this.cursors.right.isDown) {
            velocityX += this.walkSpeed;
            this.flipX = false;
        }

        this.body.setVelocityX(velocityX);

        // Movimiento toroidal
        if (this.x < 0) this.x = this.levelWidth;
        else if (this.x > this.levelWidth) this.x = 0;

        // Animaciones
        if (!this.body.onFloor()) this.play('fly', true);
        else {
            this.play('walk', true);
            if (velocityX == 0) this.stop();
        }
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