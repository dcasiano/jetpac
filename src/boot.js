export default class Boot extends Phaser.Scene {

    constructor() {
        super({ key: 'boot' });
    }


    //Carga de los assets

    preload() {
        // Sprites
        this.load.setPath('assets/sprites/');
        this.load.image('tileset', 'tileset.png');
        this.load.spritesheet('jetpac', 'jetpac.png', { frameWidth: 17, frameHeight: 24 });
        this.load.spritesheet('meteor', 'meteor.png', { frameWidth: 16, frameHeight: 14 });
        this.load.image('fuel', 'fuel.png');
        this.load.image('spaceship', 'spaceship.png');

        // Sounds
        this.load.setPath('assets/sounds/');
        this.load.audio('pick', 'pick.wav');

    }


    create() {
        this.scene.start('menu');
    }
}