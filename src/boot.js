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
        this.load.spritesheet('explosion', 'explosion.png', { frameWidth: 24, frameHeight: 17 });
        this.load.image('fuel', 'fuel.png');
        this.load.image('spaceship', 'spaceship.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('livesHUD', 'livesHUD.png');
        this.load.image('amulet', 'amulet.png');
        this.load.image('gold', 'gold.png');
        this.load.image('diamond', 'diamond.png');
        this.load.image('shipbotton', 'shipbotton.png');
        this.load.image('shipmiddle', 'shipmiddle.png');
        this.load.image('shiptop', 'shiptop.png');
        this.load.image('shipbotandmid', 'shipbotandmid.png');

        // Sounds
        this.load.setPath('assets/sounds/');
        this.load.audio('pick', 'pick.wav');
        this.load.audio('drop', 'drop.wav');
        this.load.audio('explosion', 'explosion.wav');
        this.load.audio('win', 'win.wav');
        this.load.audio('lose', 'lose.wav');
        this.load.audio('gooditempick', 'gooditempick.wav');

    }


    create() {
        this.scene.start('menu');
    }
}