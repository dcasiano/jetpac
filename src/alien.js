import Enemy from "./enemy.js";
export default class Alien extends Enemy {
    constructor(scene, platforms, player) {
        super(0, 0, 'meteor', scene, platforms, player);
        let x = super.getRandomBorder(), y = super.getRandomHeight();
        super.setPosition(x, y);

        // Movimiento
        let angle = Phaser.Math.Between(0, 359);
        let maxSpeed = 20;
        let VelX = maxSpeed * Math.cos(angle * Math.PI / 180);
        let VelY = -maxSpeed * Math.sin(-angle * Math.PI / 180);
        super.setVelocity(VelX, VelY);
        this.scene.physics.world.setBoundsCollision(false, false, true, false);
        super.setCollideWorldBounds();
        super.setExplodeOnPlatforms(false);

        // Animaciones
        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('meteor', { start: 2, end: 3 }),
            frameRate: 8, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.play('move', true);

    }
}