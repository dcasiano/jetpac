export default class Meteor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, player, levelWidth) {
        super(scene, x, y, 'meteor');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, platforms, this.toDestroy, null, this);
        this.scene.physics.add.collider(this, player, this.playerHit, null, this);
        this.setAngle(Phaser.Math.Between(0, 180));
        let maxSpeed = 100;
        this.speed = Phaser.Math.Between(-maxSpeed, maxSpeed);
        this.levelWidth = levelWidth;

    }
    create() {

    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setVelocity(this.speed, 0);
        // Movimiento toroidal
        if (this.x < 0) this.x = this.levelWidth;
        else if (this.x > this.levelWidth) this.x = 0;
    }
    toDestroy() {
        this.scene.meteorDestroyed();
        this.destroy();
    }
    playerHit() {
        this.scene.playerHitByMeteor();
    }
}