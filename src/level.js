import Platform from "./platform.js";
import Player from "./player.js";
import Meteor from "./meteor.js";
import Fuel from "./fuel.js";
import Ship from "./ship.js";
import Bullet from "./bullet.js";
import Gooditem from "./gooditem.js";
import Shippiece from "./shippiece.js";
import Alien from "./alien.js";
import Fighter from "./fighter.js";
import Ufo from "./ufo.js";
export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' });
    }
    init(data) {
        this.levelMngr = data.levelMngr;
        this.fuelNeeded = data.fuelNeeded;
        this.enemyCooldown = data.enemyCooldown;
        this.enemyType = data.enemyType;
        this.needBuild = data.needBuild;
        this.score = data.score;
        this.totalScore = data.totalScore;
        this.lastLevelPlayerLives = data.playerLives;
    }
    create() {
        this.createPlatforms();
        this.playerX = 100, this.playerY = 100;
        this.player = new Player(this, this.playerX, this.playerY, this.platforms);

        this.enemies = this.physics.add.staticGroup();
        this.lastEnemySpawned = 0; // ms
        this.fuelReloaded = 0;
        this.ship = new Ship(this, 220, 155, this.player, this.needBuild);
        this.winText = this.add.text(100, 80, "", { fontFamily: 'Pixeled' });
        if (this.needBuild) this.spawnShippieces();
        else {
            this.spawnFuel();
            this.onGooditemTaken(); // Spawneamos el primer Gooditem
        }


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


        // HUD
        this.add.image(this.cameras.main.width - 15, 15, 'livesHUD');
        this.livesText = this.add.text(this.cameras.main.width - 28, 10, "", { fontFamily: 'Pixeled' });
        this.livesText.setFontSize(8);
        this.player.setLives(this.lastLevelPlayerLives); // Establecemos las vidas que tenia en el nivel anterior (si venimos del menu ppal no hace nada)
        this.updateLives(this.player.getLives());

        this.scoreText = this.add.text(10, 10, "", { fontFamily: 'Pixeled' });
        this.scoreText.setFontSize(8);
        this.totalScoreText = this.add.text(80, 10, "", { fontFamily: 'Pixeled' });
        this.totalScoreText.setFontSize(8);
        this.updateScoreHUD();
    }

    update() {
        switch (this.enemyType) {
            case 0:
                this.spawnMeteor();
                break;
            case 1:
                this.spawnAlien();
                break;
            case 2:
                this.spawnFighter();
                break;
            case 3:
                this.spawnUfo();
                break;
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
    playerDied() {
        this.loseSound.play();
        this.time.delayedCall(1500, this.resetGame, null, this);
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
        if (this.time.now >= (this.lastEnemySpawned + this.enemyCooldown)) {
            this.enemies.add(new Meteor(this, this.platforms, this.player));
            this.lastEnemySpawned = this.time.now;
        }
    }
    spawnAlien() {
        if (this.time.now >= (this.lastEnemySpawned + this.enemyCooldown)) {
            this.enemies.add(new Alien(this, this.platforms, this.player));
            this.lastEnemySpawned = this.time.now;
        }
    }
    spawnFighter() {
        if (this.time.now >= (this.lastEnemySpawned + this.enemyCooldown)) {
            this.enemies.add(new Fighter(this, this.platforms, this.player));
            this.lastEnemySpawned = this.time.now;
        }
    }
    spawnUfo() {
        if (this.time.now >= (this.lastEnemySpawned + this.enemyCooldown)) {
            this.enemies.add(new Ufo(this, this.platforms, this.player));
            this.lastEnemySpawned = this.time.now;
        }
    }
    nextLevel() {
        this.scene.stop('level');
        this.levelMngr.nextLevel(this.score, this.totalScore, this.player.getLives());
    }
    resetGame() {
        this.scene.stop('level');
        this.levelMngr.goToMenu();
    }
    onAllFuelReloaded() {
        this.winText.text = 'Victory';
        this.winSound.play();
        this.player.allFuelReloaded();
        this.ship.takeoff();
        this.time.delayedCall(1500, this.nextLevel, null, this);
    }
    onPlayerShoot(x, y, isLookingRight) {
        new Bullet(this, x, y, this.platforms, this.enemies, isLookingRight);
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
    getShipX() {
        return this.ship.getX();
    }
    getCameraWidth() {
        return this.cameras.main.width;
    }
    getCameraHeight() {
        return this.cameras.main.height;
    }
    getFuelReloaded() {
        return this.fuelReloaded;
    }
    getFuelNeeded() {
        return this.fuelNeeded;
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
    onPieceSet(piece) {
        if (piece == "middle") {
            this.increaseScore(this.shipMidpart.getScoreValue());
            this.shipMidpart.toDestroy();
            this.shipToppart.allowPlayerCollision();
        }
        else if (piece == "top") {
            this.increaseScore(this.shipToppart.getScoreValue());
            this.shipToppart.toDestroy();
            // Empezar a spawnear fuel y gooditems
            this.spawnFuel();
            this.onGooditemTaken();
        }
    }
    onPlayerDeadWithShippiece(piece) {
        // Soltar la pieza
        if (piece == "middle") {
            this.shipMidpart.playerDrop();
        }
        else if (piece == "top") {
            this.shipToppart.playerDrop();
        }
    }
    spawnShippieces() {
        this.shipMidpart = new Shippiece(this, 50, 20, this.platforms, this.player, "middle");
        this.shipToppart = new Shippiece(this, 180, 20, this.platforms, this.player, "top");
    }
}