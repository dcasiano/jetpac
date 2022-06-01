import Enemy from "./enemy.js";
export default class Meteor extends Enemy {
    constructor(scene, platforms, player) {
        let x = Phaser.Math.Between(10, scene.getCameraWidth()), y = 10;
        super(x, y, 'meteor', scene, platforms, player);

        // Movimiento
        let angle = Phaser.Math.Between(10, 170);
        this.setAngle(angle);
        let maxSpeed = 100;
        let VelX = maxSpeed * Math.cos(angle * Math.PI / 180);
        let VelY = -maxSpeed * Math.sin(-angle * Math.PI / 180);
        super.setVelocity(VelX, VelY);

        // Animaciones
        this.scene.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('meteor', { start: 0, end: 1 }),
            frameRate: 8, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.play('move', true);

    }
}