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
        let hudY = y - 50;
        if (needBuild) hudY -= 18;
        this.hud = this.scene.add.text(x - 8, hudY, "", { fontFamily: 'Pixeled' });
        this.hud.setFontSize(10);
        if (!needBuild) this.updateHud();

        // Animaciones
        this.scene.anims.create({
            key: 'takeoff',
            frames: this.anims.generateFrameNumbers('shipanimated', { start: 0, end: 1 }),
            frameRate: 4, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
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
                this.updateHud();
            }
        }
        // Si el player lleva fuel
        else if (this.player.isFuelGrabbed()) {
            this.player.dropFuel();
            this.scene.oneFuelReloaded();
            this.updateHud();
        }
    }
    takeoff() {
        this.body.setAccelerationY(this.acc);
        this.play('takeoff', true);
    }
    updateHud() {
        this.hud.text = this.scene.getFuelReloaded() + "/" + this.scene.getFuelNeeded();
    }
    getX() {
        return this.x;
    }
}