import Enemy from "./enemy.js";
export default class Ufo extends Enemy {
    constructor(scene, platforms, player) {
        super(0, 0, 'ufo', scene, platforms, player);
        let x = super.getRandomBorder(), y = super.getRandomHeight();
        super.setPosition(x, y);
        this.player = player;
        this.vel = 25;
    }
    preUpdate(t, dt) {
        let playerX = this.player.getX(), playerY = this.player.getY();
        if (this.player.playerAlive()) { // Seguir al jugador
            let angle = Math.atan((playerY - this.y) / (playerX - this.x));
            let velX, velY;
            if (playerX - this.x < 0) {
                velX = this.vel * Math.cos(Math.PI - angle);
                velY = this.vel * Math.sin(Math.PI + angle);
            }
            else {
                velX = this.vel * Math.cos(angle);
                velY = this.vel * Math.sin(angle);
            }
            super.setVelocity(velX, velY);
        }
        super.preUpdate(t, dt);
    }
}