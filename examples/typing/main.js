/*
 * main.js
 */


var ASSETS = {
    'type': '../../assets/touch.wav',
};

var QUESTION_WORD = [
    {
        word: 'Scene',
        description: 'シーンを管理するクラス'
    },
    {
        word: 'Sprite',
        description: '画像を表示するためのクラス'
    },
    {
        word: 'Label',
        description: 'テキストを表示するためのクラス'
    },
    {
        word: 'Shape',
        description: '図形用クラス'
    },
    {
        word: 'StarShape',
        description: '星を表示するクラス'
    },
    {
        word: 'RectangleShape',
        description: '四角形を表示するクラス'
    },
    {
        word: 'CircleShape',
        description: '円を表示するクラス'
    },
    {
        word: 'HeartShape',
        description: 'ハートを表示するクラス'
    },
    {
        word: 'FlatButton',
        description: 'ボタンを表示するクラス'
    },
];

tm.simple({
    title: "Typing",
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.currentLabel = Label("Sprite").addChildTo(this);
        this.currentLabel.x = SCREEN_GRID_X.center();
        this.currentLabel.y = SCREEN_GRID_Y.span(7);
        this.currentLabel.fillStyle = "#222";
        this.currentLabel.fontSize = 72;

        this.descriptionLabel = Label("Sprite").addChildTo(this);
        this.descriptionLabel.x = SCREEN_GRID_X.center();
        this.descriptionLabel.y = SCREEN_GRID_Y.span(9);
        this.descriptionLabel.fillStyle = "#222";
        this.descriptionLabel.fontSize = 32;

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

        var key = app.keyboard;

        var text = this.currentLabel.text;
        var ch = text[0].toLowerCase();
        if (key.getKeyDown(ch)) {
            this.currentLabel.text = text.substr(1);
            SoundManager.play("type");

            if (this.currentLabel.text.length <= 0) {
                this.setQuestion();
            }
        }
    },

    setQuestion: function() {
        var q = QUESTION_WORD.pickup();
        this.currentLabel.text = q.word;
        this.descriptionLabel.text = q.description;
    },
});














