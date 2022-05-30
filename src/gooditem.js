export default class Gooditem extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player, platforms) {
        let sprite, scoreValue;
        let num = Phaser.Math.Between(0, 2);
        if (num == 0) {
            sprite = 'amulet';
            scoreValue = 100;
        }
        else if (num == 1) {
            sprite = 'gold';
            scoreValue = 250;
        }
        else {
            sprite = 'diamond';
            scoreValue = 400;
        }
        super(scene, x, y, sprite);
        this.scene = scene;
        this.player = player;
        this.scoreValue = scoreValue;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player, this.playerCollision, null, this);
        this.scene.physics.add.collider(this, platforms);
        this.body.setMaxVelocityY(150);

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
        this.pickSound = this.scene.sound.add("gooditempick", config);
    }
    playerCollision() {
        this.pickSound.play();
        this.scene.increaseScore(this.scoreValue);
        this.scene.onGooditemTaken();
        this.destroy();
    }
}