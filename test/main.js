tm.simple({
    scenes: []
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.player = Sprite("piyokichi").addChildTo(this);
        this.player.x = SCREEN_CENTER_X;
        this.player.y = SCREEN_CENTER_Y;
    },
});
