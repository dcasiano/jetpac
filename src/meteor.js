export default class Meteor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, player, levelWidth) {
        super(scene, x, y, 'meteor');
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.platCollider = this.scene.physics.add.collider(this, platforms, this.explode, null, this);
        this.playerCollider = this.scene.physics.add.collider(this, this.player, this.playerHit, null, this);
        this.levelWidth = levelWidth;
        this.hasExploded = false;

        // Movimiento
        let angle = Phaser.Math.Between(10, 170);
        this.setAngle(angle);
        let maxSpeed = 100;
        let VelX = maxSpeed * Math.cos(angle * Math.PI / 180);
        let VelY = -maxSpeed * Math.sin(-angle * Math.PI / 180);
        this.body.setVelocity(VelX, VelY);
        this.body.allowGravity = false;

        // Animaciones
        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 1 }),
            frameRate: 8, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.scene.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 2 }),
            frameRate: 8, // Velocidad de la animación
            repeat: 0    // Animación en bucle
        });
        this.on('animationcomplete-explosion', () => {
            this.toDestroy();
        })
        this.play('move', true);

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
        this.explosionSound = this.scene.sound.add("explosion", config);
    }
    create() {

    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.x < 0) this.x = this.levelWidth;
        else if (this.x > this.levelWidth) this.x = 0;
    }
    toDestroy() {
        this.scene.meteorDestroyed();
        this.destroy();
    }
    playerHit() {
        if (!this.hasExploded) {
            if (this.player.getLives() > 0) this.explosionSound.play();
            this.explosion();
            this.player.hitByMeteor();
        }
    }
    explode() {
        this.explosionSound.play();
        this.explosion();
    }
    explosion() {
        if (!this.hasExploded) {
            this.hasExploded = true;
            this.body.setVelocity(0, 0);
            this.setAngle(0);
            this.platCollider.destroy();
            this.playerCollider.destroy();
            this.play('explosion', false);
        }
    }
}