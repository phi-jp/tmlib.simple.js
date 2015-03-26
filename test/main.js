tm.simple({
    scenes: []
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        var pieceGrid = Grid().addChildTo(this);

        var pieceSize = 100;
        var maxPerLine = 5;

        (25).times(function(i) {
            var rect = RectangleShape({
                width: 90,
                height: 90,
                fillStyle: "hsl(200, 94%, 50%)",
            }).addChildTo(pieceGrid);
            rect.index = i;
            Label(i+1).addChildTo(rect);

            rect.setInteractive(true);
            rect.setBoundingType("rect");
            rect.checkHierarchy = true;
            rect.onpointingstart = function() {
                console.log(i+1);
            };
        });

        pieceGrid.maxPerLine = maxPerLine;
        pieceGrid.x = (SCREEN_WIDTH-maxPerLine*pieceSize)/2 + pieceSize/2;
        pieceGrid.y = 200;
        pieceGrid.cellWidth = pieceSize;
        pieceGrid.cellHeight = pieceSize;
        pieceGrid.reposition();

        // this.player = Sprite("piyokichi").addChildTo(this);
        // this.player.x = SCREEN_CENTER_X;
        // this.player.y = SCREEN_CENTER_Y;
    },
});
