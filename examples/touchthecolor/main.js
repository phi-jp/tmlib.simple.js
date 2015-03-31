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
        // this.time += app.deltaTime;
        // var sec = this.time/1000;
        // this.timerLabel.text = sec.floor();
    },

    setQuestion: function() {
        this.pieceGroup.removeChildren();

        var num = this.num++;
        var gx = GridSystem(SCREEN_WIDTH, num+1);
        var colorAngle = Random.randint(0, 360);
        var color = 'hsl({0}, 60%, 60%)'.format(colorAngle);
        var answerColor = 'hsl({0}, 90%, 60%)'.format(colorAngle);
        var answerIndex = Random.randint(0, num*num);
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
            this.setQuestion();
        }
    }
});














