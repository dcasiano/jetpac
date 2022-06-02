import LevelManager from "./levelmanager.js";
export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
        this.levelMngr = new LevelManager(this);
    }
    create() {
        let level1 = this.add.text(100, 40, "", { fontFamily: 'Pixeled' });
        level1.text = 'Level 1';
        level1.setInteractive();
        level1.on('pointerdown', pointer => {
            this.levelMngr.initLevel(1);
        });
        let level2 = this.add.text(100, 80, "", { fontFamily: 'Pixeled' });
        level2.text = 'Level 2';
        level2.setInteractive();
        level2.on('pointerdown', pointer => {
            this.levelMngr.initLevel(2);
        });
        let level3 = this.add.text(100, 120, "", { fontFamily: 'Pixeled' });
        level3.text = 'Level 3';
        level3.setInteractive();
        level3.on('pointerdown', pointer => {
            this.levelMngr.initLevel(3);
        });
        let level4 = this.add.text(100, 160, "", { fontFamily: 'Pixeled' });
        level4.text = 'Level 4';
        level4.setInteractive();
        level4.on('pointerdown', pointer => {
            this.levelMngr.initLevel(4);
        });
    }
}