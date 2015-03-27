/*
 * tmlib.simple.js
 */

;(function() {

    tm.simple = function(param) {
        tm.simple.all(param);
    };

    tm.simple.defaults = {
        SCREEN_WIDTH: 640,
        SCREEN_HEIGHT: 960,
        SCREEN_CENTER_X: 640/2,
        SCREEN_CENTER_Y: 960/2,
        QUERY: tm.util.QueryString.parse(location.search.substr(1)),
    };

    tm.simple.all = function(param) {
        this.expand();
        this.setup(param);
    };

    tm.simple.expand = function() {
        window.$safe(tm.simple.defaults);

        tm.$forIn(function(key, value) {
            if (typeof value !== 'object') {
                return ;
            }
            if (key === "simple") {
                return ;
            }
            if (key === "classes") {
                return ;
            }
            if (key === "global") {
                return ;
            }
            if (key === "event") {
                return ;
            }
            if (key === "dom") {
                return ;
            }

            // console.log("#### " + key + " ###########");
            value.$forIn(function(key, value) {
                if (!window[key]) {
                    window[key] = value;
                }
                else {
                    // TODO: 名前を考えなおす
                    // console.log(key);
                }
            });
        });
    };

    tm.simple.setup = function(param) {
        tm.main(function() {
            var app = tm.app.CanvasApp("#world");       // 生成
            app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
            app.fitWindow();                            // 自動フィッティング有効
            app.background = "rgba(250, 250, 250, 1.0)";// 背景色

            if (window.ASSETS) {
                var loading = LoadingScene({
                    assets: ASSETS,
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                });
                loading.onload = function() {
                    app.replaceScene(tm.simple.ManagerScene(param));
                };
                app.replaceScene(loading);
            }
            else {
                app.replaceScene(tm.simple.ManagerScene(param));
            }

            app.run();
        });
    };


    tm.define("tm.simple.ManagerScene", {
        superClass: "tm.scene.ManagerScene",

        init: function(param) {
            this.superInit({
                startLabel: QUERY.scene || 'title',
                scenes: [
                    {
                        className: "TitleScene",
                        arguments: {
                            title: param.title || "Title",
                        },
                        label: "title",
                    },
                    {
                        className: "GameScene",
                        label: "game",
                        nextLabel: "result",
                    },
                    {
                        className: "ResultScene",
                        label: "result",
                        nextLabel: "title",
                    },

                    {
                        className: "PauseScene",
                        label: "pause",
                    },
                ],
            });
        },
    });


})();


/*
 * グリッドシステム
 */
tm.define("tm.util.GridSystem", {
    width: 640, // 幅
    col: 12,    // 列数
    
    init: function(width, col) {
        if (typeof arguments[0] === 'object') {
            var param = arguments[0];
            width = param.width;
            col = param.col;
        }
        
        this.width = width;
        this.col = col;
        this.unitWidth = this.width/this.col;
    },
    
    // スパン指定で値を取得(負数もok)
    span: function(index) {
        index += this.col;
        index %= this.col;

        return this.unitWidth * index;
    },
    
    // 真ん中
    center: function() {
        return this.unitWidth * (this.col/2);
    },
});


var GRID_X = tm.util.GridSystem({width:640, col:16});
var GRID_Y = tm.util.GridSystem({width:960, col:16});