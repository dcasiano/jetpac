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
        // Creacion de plataformas con Tiled
        this.map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 8,
            tileHeight: 8
        });
        const tileset1 = this.map.addTilesetImage('tiles1', 'tileset');
        this.platforms = this.map.createLayer('toplayer', tileset1, 0, 0);
        this.platforms.setCollisionBetween(0, 999);

        this.playerX0 = 100, this.playerY0 = 100;
        this.player = new Player(this, this.playerX0, this.playerY0, this.platforms);

        this.enemies = this.physics.add.staticGroup();
        this.lastEnemySpawned = 0; // ms
        this.fuelReloaded = 0;
        this.ship = new Ship(this, 160, 160, this.player, this.needBuild);
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
        this.spawnEnemy();
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
        this.fuel = new Fuel(this, Phaser.Math.Between(10, this.getCameraWidth() - 10), 50, this.platforms, this.player);
    }
    spawnEnemy() {
        if (this.time.now >= (this.lastEnemySpawned + this.enemyCooldown)) {
            this.lastEnemySpawned = this.time.now;
            switch (this.enemyType) {
                case 0:
                    this.enemies.add(new Meteor(this, this.platforms, this.player));
                    break;
                case 1:
                    this.enemies.add(new Alien(this, this.platforms, this.player));
                    break;
                case 2:
                    this.enemies.add(new Fighter(this, this.platforms, this.player));
                    break;
                case 3:
                    this.enemies.add(new Ufo(this, this.platforms, this.player));
                    break;
            }
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
        return this.playerX0;
    }
    getPlayerInitialY() {
        return this.playerY0;
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
        this.shipMidpart = new Shippiece(this, 40, 20, this.platforms, this.player, "middle");
        this.shipToppart = new Shippiece(this, 200, 10, this.platforms, this.player, "top");
    }
}