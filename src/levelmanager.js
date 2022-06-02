export default class LevelManager {
    constructor(scene) {
        this.scene = scene;
        this.currentLevel = 0; // 0 para el menu
    }
    setLevel(numLevel, score, totalScore, playerLives) {
        this.currentLevel = numLevel;
        if (numLevel == 1) this.scene.scene.start('level', { levelMngr: this, fuelNeeded: 1, enemyCooldown: 1000, enemyType: 0, needBuild: true, score: score, totalScore: totalScore, playerLives: playerLives });
        else if (numLevel == 2) this.scene.scene.start('level', { levelMngr: this, fuelNeeded: 2, enemyCooldown: 1000, enemyType: 1, needBuild: false, score: score, totalScore: totalScore, playerLives: playerLives });
        else if (numLevel == 3) this.scene.scene.start('level', { levelMngr: this, fuelNeeded: 4, enemyCooldown: 1000, enemyType: 2, needBuild: true, score: score, totalScore: totalScore, playerLives: playerLives });
        else if (numLevel == 4) this.scene.scene.start('level', { levelMngr: this, fuelNeeded: 5, enemyCooldown: 2000, enemyType: 3, needBuild: false, score: score, totalScore: totalScore, playerLives: playerLives });
        else this.goToMenu();
    }
    goToMenu() {
        this.currentLevel = 0;
        this.scene.scene.start('menu');
    }
    initLevel(numLevel) {
        this.setLevel(numLevel, 0, 0, -1);
    }
    nextLevel(score, totalScore, playerLives) {
        this.setLevel(this.currentLevel + 1, score, totalScore, playerLives);
    }
}