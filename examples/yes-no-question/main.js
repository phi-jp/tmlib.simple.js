/*
 * main.js
 */


var ASSETS = {
    'correct_se': '../../assets/correct.mp3',
    'incorrect_se': '../../assets/incorrect.mp3',
    'correct': '../../assets/correct.png',
    'incorrect': '../../assets/incorrect.png',
};

var QUESTIONS = [
    {
        text: '「ハッカー」とは「不正行為を行う人」\nのことである',
        answer: false,
    },
    {
        text: '1+1*-(1+10)=-10',
        answer: true,
    },
    {
        text: '上り坂より下り坂のほうが多い',
        answer: false,
    },
    {
        text: 'マクドナルドのロゴマークは、\nアルファベットの「Ｍ」である。',
        answer: false,
    },
    {
        text: '地上で働いているアリは、\nおばあさんアリである。',
        answer: true,
    },
];

tm.simple({
    title: "◯✕クイーズ",
});

tm.define("GameScene", {
    superClass: "Scene",

    init: function() {
        this.superInit();

        this.score = 0;

        var questionLabel = Label("hoge").addChildTo(this);
        questionLabel.x = SCREEN_GRID_X.center();
        questionLabel.y = SCREEN_GRID_Y.span(5);
        questionLabel.fillStyle = "#222";
        questionLabel.fontSize = 32;
        this.questionLabel = questionLabel;

        this.correctSprite = Sprite("correct").addChildTo(this);
        this.correctSprite.x = SCREEN_GRID_X.span(4);
        this.correctSprite.y = SCREEN_GRID_Y.span(10);
        this.correctSprite.setInteractive(true, 'rect');
        this.correctSprite.onpointingstart = function() {
            this.judge(true);
        }.bind(this);
        this.incorrectSprite = Sprite("incorrect").addChildTo(this);
        this.incorrectSprite.x = SCREEN_GRID_X.span(-4);
        this.incorrectSprite.y = SCREEN_GRID_Y.span(10);
        this.incorrectSprite.setInteractive(true, 'rect');
        this.incorrectSprite.onpointingstart = function() {
            this.judge(false);
        }.bind(this);

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

        return ;

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
        var q = QUESTIONS.pickup();
        QUESTIONS.erase(q);
        this.questionLabel.text = q.text;

        this.questionLabel.alpha = 0;
        this.questionLabel.tweener.clear().fadeIn(500);

        this.question = q;
    },

    judge: function(answer) {
        if (this.question.answer === answer) {
            this.score++;
            SoundManager.play('correct_se');
            if (QUESTIONS.length <= 0) {
                this.nextArguments = {
                    score: this.score,
                }
                this.app.popScene();
            }
            else {
                this.setQuestion();
            }
        }
        else {
            this.score--;
            SoundManager.play('incorrect_se');
        }
    },
});














