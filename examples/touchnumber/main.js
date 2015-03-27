/*
 * main.js
 */

tm.simple({
    title: "Touch Number",
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.currentIndex = 1;
        this.time = 0;
        var pieceGrid = Grid().addChildTo(this);
        var pieceSize = 100;
        var maxPerLine = 5;
        var numbers = Array.range(1, 26);
        var self = this;

        numbers.shuffle().each(function(index) {
            var rect = RectangleShape({
                width: 90,
                height: 90,
                fillStyle: "hsl(190, 94%, 50%)",
            }).addChildTo(pieceGrid);
            rect.index = index;
            rect.setInteractive(true);
            rect.setBoundingType("rect");
            rect.checkHierarchy = true;
            rect.onpointingstart = function() {
                self.check(this);
            };
            
            var label = Label(index).addChildTo(rect);
            label.fontSize = 32;
        });

        pieceGrid.maxPerLine = maxPerLine;
        pieceGrid.x = (SCREEN_WIDTH-maxPerLine*pieceSize)/2 + pieceSize/2;
        pieceGrid.y = 240;
        pieceGrid.cellWidth = pieceSize;
        pieceGrid.cellHeight = pieceSize;
        pieceGrid.reposition();

        var timerLabel = Label(0).addChildTo(this);
        timerLabel.x = SCREEN_CENTER_X;
        timerLabel.y = 100;
        timerLabel.fillStyle = "#222";
        timerLabel.fontSize = 64;
        this.timerLabel = timerLabel;


        var resetButton = FlatButton({
            text: "RESET",
        }).addChildTo(this);
        resetButton.x = SCREEN_CENTER_X;
        resetButton.y = 800;

        resetButton.onpush = function() {
            self.reset();
        };
    },

    update: function(app) {
        this.time += app.deltaTime;
        var sec = this.time/1000;
        this.timerLabel.text = sec.floor();
    },

    check: function(piece) {
        if (this.currentIndex === piece.index) {
            this.currentIndex += 1;
            piece.alpha = 0.5;
            piece.setInteractive(false);

            if (this.currentIndex > 25) {
                this.clear();
            }
        }
    },

    clear: function() {
        var sec = this.time/1000;
        var score = 100 - sec.floor();
        score = Math.max(score, 0);
        this.nextArguments = {
            score: score,
        };
        this.app.popScene();
    },

    reset: function() {
        this.nextLabel = "game";
        this.app.popScene();
    },
});














