export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, platforms, enemies, levelWidth, lookingRight) {
        super(scene, x, y, 'bullet');
        this.scene = scene;
        this.enemies = enemies;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, platforms, this.destroy, null, this);
        this.body.allowGravity = false;
        this.levelWidth = levelWidth;
        let vel = 150;
        if (!lookingRight) vel = -vel;
        this.body.setVelocity(vel, 0);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        let alive = true;
        this.enemies.children.iterate(item => {
            if (this.scene.physics.collide(item, this)) {
                alive = false;
                item.onBulletCollision();
            }
        })
        if (this.x < 0) alive = false;
        else if (this.x > this.levelWidth) alive = false;

        if (!alive) this.destroy();
    }

}