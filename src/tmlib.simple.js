/*
 * tmlib.simple.js
 */

;(function() {

    tm.simple = function(param) {
        param.$safe({
            query: "#world",
            title: "Title",
            background: "rgba(250, 250, 250, 1.0)",
            width: 640,
            height: 960,
        });
        tm.simple.all(param);
    };

    tm.simple.all = function(param) {
        this.expand(param);
        this.setup(param);
    };

    tm.simple.expand = function(param) {
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

        window.$extend({
            SCREEN_WIDTH: param.width,
            SCREEN_HEIGHT: param.height,
            SCREEN_CENTER_X: param.width/2,
            SCREEN_CENTER_Y: param.height/2,
            SCREEN_GRID_X: GridSystem(param.width, 16),
            SCREEN_GRID_Y: GridSystem(param.height, 16),
            QUERY: tm.util.QueryString.parse(location.search.substr(1)),
        });
    };

    tm.simple.setup = function(param) {
        tm.main(function() {
            var app = tm.app.CanvasApp(param.query);       // 生成
            app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
            app.fitWindow();                            // 自動フィッティング有効
            app.background = param.background;// 背景色

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
                            title: param.title,
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


