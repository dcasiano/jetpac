export default class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tileset');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }
}