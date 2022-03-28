import Platform from "./platform.js";
import Player from "./player.js";
import Meteor from "./meteor.js";
import Fuel from "./fuel.js";
import Ship from "./ship.js";
export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }
    init(data) {
        this.data = data;
    }
    create() {
        this.createPlatforms();
        this.player = new Player(this, 100, 100, this.platforms);

        this.fuelSpawned = false;
        this.meteorSpawned = false;
        this.lastMeteorDestroyed = 0; // ms
        this.ship = new Ship(this, 220, 155, this.player);
        this.label = this.add.text(100, 100, "");
        if (this.data[0] == 0) {
            this.ship.setFuelNeeded(2);
            this.meteorCooldown = 2000; // ms
        }
        else if (this.data[0] == 1) {
            this.ship.setFuelNeeded(3);
            this.meteorCooldown = 1000; // ms
        }
        else {
            this.ship.setFuelNeeded(5);
            this.meteorCooldown = 500; // ms
        }
    }
    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        let width = 24;
        for (let i = 0; i < 11; i++) {
            this.platforms.add(new Platform(this, i * width + width / 2, 185));
        }
        let offset = 40;
        for (let i = 0; i < 2; i++) {
            this.platforms.add(new Platform(this, i * width + width + offset / 2, 70))
        }
        offset = 150;
        for (let i = 0; i < 2; i++) {
            this.platforms.add(new Platform(this, i * width + width + offset / 2, 120))
        }
        offset = 280;
        for (let i = 0; i < 2; i++) {
            this.platforms.add(new Platform(this, i * width + width + offset / 2, 50))
        }
    }
    playerHitByMeteor() {
        this.restartGame();
    }
    oneFuelReloaded() {
        this.fuel.toDestroy();
        this.fuelSpawned = false;
    }
    update() {
        if (this.ship.allFuelReloaded()) {
            this.label.text = 'Victory';
            this.time.delayedCall(1500, this.restartGame, null, this);
        }
        if (!this.fuelSpawned) {
            this.spawnFuel();

        }
        if (!this.meteorSpawned) this.spawnMeteor();
    }
    restartGame() {
        this.scene.start('menu');
    }
    spawnFuel() {
        this.fuel = new Fuel(this, Phaser.Math.Between(50, 206), 150, this.platforms, this.player);
        this.fuelSpawned = true;
    }
    spawnMeteor() {
        if (this.time.now >= (this.lastMeteorDestroyed + this.meteorCooldown)) {
            this.meteor = new Meteor(this, 120, 50, this.platforms, this.player);
            this.meteorSpawned = true;
        }

    }
    meteorDestroyed() {
        this.meteorSpawned = false;
        this.lastMeteorDestroyed = this.time.now;
    }
}