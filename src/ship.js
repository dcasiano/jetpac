export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player, needBuild) {
        let sprite = 'spaceship';
        if (needBuild) {
            sprite = 'shipbotton';
            y += 18;
        }
        super(scene, x, y, sprite);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, player, this.playerCollision, null, this);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.setMaxVelocityY(150);
        this.acc = -850;
        this.middlePieceSet = false;
    }
    playerCollision() {
        // Si el player lleva una pieza de la nave
        if (this.player.isShippieceGrabbed()) {
            if (!this.middlePieceSet) {
                this.middlePieceSet = true;
                this.scene.onPieceSet(this.player.getShippieceGrabbed());
                this.player.dropShippiece();
                this.setTexture('shipbotandmid');
                this.y -= 8;
                this.body.setSize(16, 32);
            }
            else {
                this.scene.onPieceSet(this.player.getShippieceGrabbed());
                this.player.dropShippiece();
                this.setTexture('spaceship');
                this.y -= 8;
                this.body.setSize(16, 48);
            }
        }
        // Si el player lleva fuel
        else if (this.player.isFuelGrabbed()) {
            this.player.dropFuel();
            this.scene.oneFuelReloaded();
        }
    }
    takeoff() {
        this.body.setAccelerationY(this.acc);
    }
}