/*
 * main.js
 */

var speed = 20;

tm.simple({
    title: "Block Break",
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.currentIndex = 1;
        this.time = 0;
        
        var blockGroup = tm.display.CanvasElement().addChildTo(this);
        var pieceSize = 64;
        var maxPerLine = 8;
        var pieceOffsetY = 100;
        this.blockGroup = blockGroup;

        var gs = GridSystem(SCREEN_WIDTH, 10);

        (64).times(function(index) {
            var xIndex = index%maxPerLine;
            var yIndex = (index/maxPerLine).floor();

            var rect = RectangleShape({
                width: 64,
                height: 32,
                fillStyle: "hsl(190, 94%, 50%)",
            }).addChildTo(blockGroup);
            rect.origin.x = 0;
            rect.x = gs.span(xIndex+1);
            rect.y = pieceOffsetY + yIndex*32;
        });

        this.ball = Ball().addChildTo(this);
        this.ball.setBoundingType('rect');

        this.paddle = Paddle().addChildTo(this);
        this.paddle.setPosition(SCREEN_CENTER_X, 800);
        this.paddle.hold(this.ball);
    },

    update: function(app) {
        if (this.paddle.isHold()) return ;

        (speed).times(function() {
            this.hitCheck();
            this.ball.move(1);
        }, this);
    },

    hitCheck: function() {
        var ball = this.ball;
        var paddle = this.paddle;
        var blocks = this.blockGroup.children;
        blocks.some(function(block) {
            if (ball.isHitElement(block)) {
                block.remove();

                /*
                var circle = tm.geom.Circle(ball.x, ball.y, 10);
                if (
                    circle.contains(block.left, block.top) ||
                    circle.contains(block.left, block.bottom) ||
                    circle.contains(block.right, block.top) ||
                    circle.contains(block.right, block.bottom)
                    )
                {
                    var dir = null;
                    if (ball.v.x > ball.v.y) {
                        ball.v.x *= -1;
                        dir = 'yoko';
                    }
                    else {
                        ball.v.y *= -1;
                        dir = 'tate';
                    }
                }
                */

                if (block.left <= ball.x && ball.x <= block.right) {
                    ball.v.y *= -1;
                }
                else {
                    ball.v.x *= -1;
                }
                return true;
            }
        });

        if (ball.isHitElement(paddle)) {
            var dir = tm.geom.Vector2.sub(ball, paddle);
            dir.normalize();

            ball.v.x = dir.x;
            ball.v.y = dir.y;
        }

        if (ball.x <= 0) {
            ball.x = 0;
            ball.v.x *= -1;
        }
        else if (ball.x >= SCREEN_WIDTH) {
            ball.x = SCREEN_WIDTH;
            ball.v.x *= -1;
        }
        if (ball.y <= 0) {
            ball.y = 0;
            ball.v.y *= -1;
        }
        else if (ball.y >= SCREEN_HEIGHT) {
            ball.y = SCREEN_HEIGHT;
            ball.v.y *= -1;
        }
    },

    onpointingmove: function(e) {
        var p = e.app.pointing;
        this.paddle.x = p.x;
    },

    onpointingend: function(e) {
        var p = e.app.pointing;

        if (this.paddle.isHold() === true) {
            this.paddle.release();
            this.ball.v.x = 0;
            this.ball.v.y =-1;
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
});

tm.define("Paddle", {
    superClass: "RectangleShape",

    init: function() {
        this.superInit({
            strokeStyle: "#222",
            fillStyle: "white",
            width: 160,
            height: 30,
        });
    },

    update: function() {
        this._updateBallPosition();
    },

    hold: function(ball) {
        this.ball = ball;
        this._updateBallPosition();
    },

    release: function() {
        this.ball = null;
    },

    isHold: function() {
        return this.ball !== null;
    },

    _updateBallPosition: function() {
        if (this.ball) {
            this.ball.x = this.x;
            this.ball.bottom = this.top;
        }
    },
});

tm.define("Ball", {
    superClass: "CircleShape",

    init: function() {
        this.superInit({
            fillStyle: "white",
            strokeStyle: "black",
            width: 20,
            height: 20,
        });

        this.v = tm.geom.Vector2(0, 0);
    },

    move: function(len) {
        this.x += this.v.x * len;
        this.y += this.v.y * len;
    },
})












