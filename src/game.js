import Boot from './boot.js';
import Level from './level.js';
import Menu from './menu.js';
window.onload = () => {

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },

        pixelArt: true,
        scene: [Boot, Menu, Level],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 4000 },
                debug: false
            }
        }
    };

    new Phaser.Game(config);
};
