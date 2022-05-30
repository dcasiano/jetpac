import Platform from "./platform.js";
import Player from "./player.js";
import Meteor from "./meteor.js";
import Fuel from "./fuel.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";
import Gooditem from "./gooditem.js";
export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }
    init(data) {
        this.fuelNeeded = data.fuelNeeded;
        this.meteorCooldown = data.meteorCooldown;
        this.score = data.score;
        this.totalScore = data.totalScore;
        this.playerLives = data.playerLives;
    }
    create() {
        this.createPlatforms();
        this.playerX = 100, this.playerY = 100;
        this.player = new Player(this, this.playerX, this.playerY, this.platforms);

        this.enemies = this.physics.add.staticGroup();
        this.meteorSpawned = false;
        this.lastMeteorDestroyed = 0; // ms
        this.ship = new Ship(this, 220, 155, this.player);
        this.winText = this.add.text(100, 80, "", { fontFamily: 'Pixeled' });
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
        this.onGooditemTaken(); // Spawneamos el primer Gooditem

        // HUD
        this.add.image(this.cameras.main.width - 15, 15, 'livesHUD');
        this.livesText = this.add.text(this.cameras.main.width - 28, 10, "", { fontFamily: 'Pixeled' });
        this.livesText.setFontSize(8);
        this.player.setLives(this.playerLives); // Establecemos las vidas que tenia en el nivel anterior (si venimos del menu ppal no hace nada)
        this.updateLives(this.player.getLives());

        this.scoreText = this.add.text(10, 10, "", { fontFamily: 'Pixeled' });
        this.scoreText.setFontSize(8);
        this.totalScoreText = this.add.text(80, 10, "", { fontFamily: 'Pixeled' });
        this.totalScoreText.setFontSize(8);
        this.updateScoreHUD();
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
        this.increaseScore(this.fuel.getScoreValue());
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
            this.enemies.add(new Meteor(this, 120, 50, this.platforms, this.player, this.cameras.main.width));
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
        this.winText.text = 'Victory';
        this.winSound.play();
        this.player.allFuelReloaded();
        this.ship.takeoff();
        this.time.delayedCall(1500, this.restartGame, null, this);
    }
    onPlayerShoot(x, y, isLookingRight) {
        new Bullet(this, x, y, this.platforms, this.enemies, this.cameras.main.width, isLookingRight);
    }
    getTimeNow() {
        return this.time.now;
    }
    getPlayerInitialX() {
        return this.playerX;
    }
    getPlayerInitialY() {
        return this.playerY;
    }
    getCameraWidth() {
        return this.cameras.main.width;
    }
    getCameraHeight() {
        return this.cameras.main.height;
    }
    updateLives(lives) {
        this.livesText.text = lives;
    }
    onPlayerDeadWithFuel() {
        this.fuel.playerDrop();
    }
    increaseScore(value) {
        this.score += value;
        this.totalScore += value;
        if (this.score >= 1000) {
            this.score -= 1000;
            this.player.increaseOneLive();
        }
        this.updateScoreHUD();
    }
    updateScoreHUD() {
        this.scoreText.text = "Score: " + this.score;
        this.totalScoreText.text = "Total: " + this.totalScore;
    }
    spawnGooditem() {
        let x = Phaser.Math.Between(0 + 10, this.getCameraWidth() - 10), y = 20;
        new Gooditem(this, x, y, this.player, this.platforms);
    }
    onGooditemTaken() {
        this.time.delayedCall(Phaser.Math.Between(1000, 3000), this.spawnGooditem, null, this);
    }
}