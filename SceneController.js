var SceneNameDict = {
    0: "TransitionScene",
    1: "LoadingScene",
    2: "MainScene",
    3: "SelectScene",
    4: "GameScene",
    5: "GameSuccessScene",
    6: "GameFailureScene"
};

var SceneController = cc.Class({
    name:"SceneController",
    properties: {
        _afterSceneId:0,
        _backStack:[]
    },
    ctor: function () {
        this._afterSceneId = 0;
        this._backStack = [];
    },
    startScene: function(nextSceneId) {
        if(nextSceneId==this._backStack[this._backStack.length-1]){
            return;
        } else {
            this._afterSceneId = nextSceneId;
            this._backStack.push(nextSceneId);
            var scene = cc.director.getScene();
            var canvas = scene.getChildByName("Canvas");
            cc.tween(canvas)
            .to(1, { opacity: 0})
            // 当前面的动作都执行完毕后才会调用这个回调函数
            .call(() => { 
                cc.director.loadScene(SceneNameDict[0]);
            })
            .start()
        }
    },
    startTargetScene: function(){
        var self = this;
        cc.director.preloadScene(SceneNameDict[self._afterSceneId], function(count,totalCount,res){

        },function(err,res){
            cc.director.loadScene(SceneNameDict[self._afterSceneId],function(){
                var scene = cc.director.getScene();
                var canvas = scene.getChildByName("Canvas");
                canvas.opacity = 0;
                cc.tween(canvas)
                .to(1, { opacity: 255})
                .start()
            });

        });
    },
    finishScene: function(){
        if(this._backStack.length>1){
            var lastSceneId = this._backStack.pop();
            lastSceneId = this._backStack.pop();
            this.startScene(lastSceneId);
        } else {
            cc.error("已经回到第一个场景")
        }
    },
});

// 添加全局变量定义
window.SceneController = new SceneController()