import Enemy from "./enemy.js";
export default class Fighter extends Enemy {
    constructor(scene, platforms, player) {
        super(0, 0, 'fighter', scene, platforms, player);
        let x = super.getRandomBorder(), y = super.getRandomHeight();
        super.setPosition(x, y);
        this.scene = scene;

        // Movimiento
        this.VelX = 40;
        this.VelY = 25;
        if (x != 0) { // Si esta en el lado derecho
            this.VelX *= -1;
            this.flipX = true;
        }
        super.setVelocity(this.VelX, this.VelY);
        this.swapCooldown = 1000;
        this.lastSwapTime = this.swapCooldown;
    }
    preUpdate(t, dt) {
        if (this.scene.getTimeNow() >= this.lastSwapTime + this.swapCooldown) {
            this.lastSwapTime = this.scene.getTimeNow();
            this.VelY *= -1;
            super.setVelocity(this.VelX, this.VelY);
        }
        super.preUpdate(t, dt);
    }
}