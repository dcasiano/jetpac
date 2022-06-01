export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(x, y, sprite, scene, platforms, player, levelWidth) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.platCollider = this.scene.physics.add.collider(this, platforms, this.platformCollision, null, this);
        this.playerCollider = this.scene.physics.add.collider(this, this.player, this.playerHit, null, this);
        this.levelWidth = levelWidth;
        this.hasExploded = false;
        this.explodeOnPlatforms = true;

        this.body.allowGravity = false;

        // Animaciones
        this.scene.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 2 }),
            frameRate: 8, // Velocidad de la animación
            repeat: 0    // Animación en bucle
        });
        this.on('animationcomplete-explosion', () => {
            this.toDestroy();
        })

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
        //this.scene.meteorDestroyed();
        this.destroy();
    }
    playerHit() {
        if (!this.hasExploded) {
            if (this.player.getLives() > 0) this.explosionSound.play();
            this.explosion();
            this.player.hitByMeteor();
        }
    }
    platformCollision() {
        if (this.explodeOnPlatforms) {
            this.explosionSound.play();
            this.explosion();
        }
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
    onBulletCollision() {
        this.explosionSound.play();
        this.explosion();
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setVelocity(VelX, VelY) {
        this.body.setVelocity(VelX, VelY);
    }
    getRandomHeight(levelHeight) {
        return Phaser.Math.Between(10, levelHeight - 10);
    }
    getRandomBorder(levelWidth) {
        return levelWidth * Phaser.Math.Between(0, 1);
    }
    setCollideWorldBounds() {
        this.body.setCollideWorldBounds();
        this.body.setBounce(1, 1);
    }
    setExplodeOnPlatforms(value) {
        this.explodeOnPlatforms = value;
    }
}