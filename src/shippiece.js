import Grippableitem from "./grippableitem.js";
export default class Shippiece extends Grippableitem {
    constructor(scene, x, y, platforms, player, piece) {
        let sprite;
        if (piece == "top") sprite = 'shiptop';
        else if (piece == "middle") sprite = 'shipmiddle';
        super(scene, x, y, sprite, platforms, player, 50);
        this.playerCollider = scene.physics.add.collider(this, player, this.playerGrabPiece, null, this);
        if (piece == "top") this.playerCollider.active = false;
        this.piece = piece;
        this.player = player;
    }
    playerGrabPiece() {
        if (!super.getIsGrabbed()) {
            super.playerGrab();
            this.player.grabShippiece(this.piece);
        }
    }
    allowPlayerCollision() {
        this.playerCollider.active = true;
    }
}