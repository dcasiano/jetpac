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
        this.fuelNeeded = data.fuelNeeded;
        this.meteorCooldown = data.meteorCooldown;
    }
    create() {
        this.createPlatforms();
        this.player = new Player(this, 100, 100, this.platforms, this.cameras.main.width);

        this.meteorSpawned = false;
        this.lastMeteorDestroyed = 0; // ms
        this.ship = new Ship(this, 220, 155, this.player);
        this.label = this.add.text(100, 80, "", { fontFamily: 'Pixeled' });
        this.spawnFuel();
        this.fuelReloaded = 0;

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
        this.winSound = this.sound.add("win", config);
        this.loseSound = this.sound.add("lose", config);
    }

    update() {
        if (!this.meteorSpawned) this.spawnMeteor();
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
        this.loseSound.play();
        this.time.delayedCall(1500, this.restartGame, null, this);
    }
    oneFuelReloaded() {
        this.fuel.toDestroy();
        this.fuelReloaded++;
        if (this.fuelReloaded >= this.fuelNeeded) this.onAllFuelReloaded();
        else this.spawnFuel();
    }
    spawnFuel() {
        this.fuel = new Fuel(this, Phaser.Math.Between(50, 206), 150, this.platforms, this.player);
    }
    spawnMeteor() {
        if (this.time.now >= (this.lastMeteorDestroyed + this.meteorCooldown)) {
            this.meteor = new Meteor(this, 120, 50, this.platforms, this.player, this.cameras.main.width);
            this.meteorSpawned = true;
        }
    }
    meteorDestroyed() {
        this.meteorSpawned = false;
        this.lastMeteorDestroyed = this.time.now;
    }
    restartGame() {
        this.scene.start('menu');
    }
    onAllFuelReloaded() {
        this.label.text = 'Victory';
        this.winSound.play();
        this.player.allFuelReloaded();
        this.ship.takeoff();
        this.time.delayedCall(1500, this.restartGame, null, this);
    }
}