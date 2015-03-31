/*
 * main.js
 */


var ASSETS = {
    'type': '../../assets/touch.wav',
};

tm.simple({
    title: "Touch the color",
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.pieceGroup = CanvasElement().addChildTo(this);

        this.score = 0;
        this.time = 0;

        this.scoreLabel = Label(0).addChildTo(this);
        this.scoreLabel.x = SCREEN_GRID_X.center();
        this.scoreLabel.y = SCREEN_GRID_Y.span(2);
        this.scoreLabel.fontSize = 64;
        this.scoreLabel.fillStyle = "#444";

        this.gauge = FlatGauge({
            width: 500,
            height: 40,
            color: 'hsl(220, 80%, 60%)',
        }).addChildTo(this);
        this.gauge.x = SCREEN_GRID_X.center()-250;
        this.gauge.y = SCREEN_GRID_Y.span(14);

        this.num = 2;

        this.setQuestion();
    },

    onenter: function() {
        // var scene = CountScene({
        //     width: SCREEN_WIDTH,
        //     height: SCREEN_HEIGHT,
        // });
        // this.app.pushScene(scene);



    },

    update: function(app) {
        this.time += app.deltaTime;

        var rate = (30000-this.time)/30000;
        this.gauge.setPercent(rate*100);

        if (rate <= 0) {
            this.gameover();
        }
    },

    setQuestion: function() {
        this.pieceGroup.removeChildren();

        var num = (this.score/4).floor()+2;
        var gx = GridSystem(SCREEN_WIDTH, num+1);
        var colorAngle = Random.randint(0, 360);
        var color = 'hsl({0}, 60%, 60%)'.format(colorAngle);
        var answerColor = 'hsl({0}, 90%, 60%)'.format(colorAngle);
        var answerIndex = Random.randint(0, num*num-1);
        var cornerRadius = gx.span(1)*0.1;
        var pieceSize = gx.span(1)*0.99;
        (num).times(function(i) {
            (num).times(function(j) {
                var rect = tm.display.RoundRectangleShape({
                    width: pieceSize,
                    height: pieceSize,
                    fillStyle: color,
                    cornerRadius: cornerRadius,
                }).addChildTo(this.pieceGroup);
                
                rect.x = gx.span(j+1);
                rect.y = gx.span(i) + 150 + gx.span(1);

                rect.setInteractive(true, 'rect');
                rect.onpointingstart = function() {
                    this.check(rect);
                }.bind(this);

                var index = i*num + j;
                if (index == answerIndex) {
                    rect.answer = true;
                    rect.fillStyle = answerColor;
                }
            }, this);
        }, this);
    },

    check: function(piece) {
        if (piece.answer) {
            this.score += 1;
            this.scoreLabel.text = this.score;

            this.setQuestion();
        }
    },

    gameover: function() {
        this.nextArguments = {
            score: this.score,
        };

        this.app.popScene();
    },
});














