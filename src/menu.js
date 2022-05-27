export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }
    create() {
        let facil = this.add.text(100, 50, "", { fontFamily: 'Pixeled' });
        facil.text = 'Fácil';
        facil.setInteractive();
        facil.on('pointerdown', pointer => {
            this.scene.start('level', { fuelNeeded: 2, meteorCooldown: 2000 });
        });
        let intermedio = this.add.text(100, 100, "", { fontFamily: 'Pixeled' });
        intermedio.text = 'Intermedio';
        intermedio.setInteractive();
        intermedio.on('pointerdown', pointer => {
            this.scene.start('level', { fuelNeeded: 3, meteorCooldown: 1000 });
        });
        let dificil = this.add.text(100, 150, "", { fontFamily: 'Pixeled' });
        dificil.text = 'Difícil';
        dificil.setInteractive();
        dificil.on('pointerdown', pointer => {
            this.scene.start('level', { fuelNeeded: 5, meteorCooldown: 500 });
        });
    }
}