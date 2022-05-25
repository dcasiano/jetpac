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
        this.soundPlayed = false;
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.isGrabbed) {
            this.x = this.player.getX();
            this.y = this.player.getY();
        }


    }
    playerGrab() {
        this.isGrabbed = true;
        this.body.allowGravity = false;
        if (!this.soundPlayed) {
            this.soundPlayed = true;
            this.pickSound.play();
        }
        this.player.grabFuel();
    }
    toDestroy() {
        this.destroy();
    }
}