export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, levelWidth) {
        super(scene, x, y, 'jetpac');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Colision entre jugador y plataformas
        this.scene.physics.add.collider(this, platforms);
        // Cursores para el control
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keys = this.scene.input.keyboard.addKeys("SPACE");
        this.walkSpeed = 100, this.jumpAcc = -850;
        this.levelWidth = levelWidth;
        this.fuelGrabbed = false;
        this.body.setMaxVelocityY(150);
        this.shootCooldown = 500;
        this.lastShotTime = -this.shootCooldown;

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

        // Audio
        const config = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        this.pickSound = this.scene.sound.add("pick", config);
        this.dropSound = this.scene.sound.add("drop", config);

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
        
        // Shoot
        if (this.keys.SPACE.isDown && this.scene.getTimeNow() >= (this.lastShotTime + this.shootCooldown)) {
            this.lastShotTime = this.scene.getTimeNow();
            this.scene.onPlayerShoot(this.x, this.y, !this.flipX);
        }

        // Animaciones
        if (!this.body.onFloor()) this.play('fly', true);
        else {
            this.play('walk', true);
            if (velocityX == 0) this.stop();
        }
    }
    hitByMeteor() {
        this.scene.playerHitByMeteor();
        this.destroy();
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    grabFuel() {
        this.fuelGrabbed = true;
        this.pickSound.play();
    }
    dropFuel() {
        this.fuelGrabbed = false;
        this.dropSound.play();
    }
    isFuelGrabbed() {
        return this.fuelGrabbed;
    }
    allFuelReloaded() {
        this.destroy();
    }
}