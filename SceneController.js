var SceneNameDict = {
    0: "TransitionScene",
    1: "LoadingScene",
    2: "MainScene",
    3: "SelectScene",
    4: "GameScene",
    5: "GameSuccessScene",
    6: "GameFailureScene",
    7: "GameDescScene",
    8: "ListScene"
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
            var rootNode = cc.find("Audio");
            rootNode.getComponent(cc.BlockInputEvents).enabled = true;

            cc.tween(rootNode)
            .to(1, { opacity: 255})
            // 当前面的动作都执行完毕后才会调用这个回调函数
            .call(() => { 
                cc.director.loadScene(SceneNameDict[0]);
            })
            .start()
        }
    },
    startTargetScene: function(){
        var _this = this;
        cc.director.preloadScene(SceneNameDict[_this._afterSceneId], function(count,totalCount,res){

        },function(err,res){
            cc.director.loadScene(SceneNameDict[_this._afterSceneId],function(){
                var rootNode = cc.find("Audio");
                
                cc.tween(rootNode)
                .to(1, { opacity: 0})
                .call(()=>{
                    rootNode.getComponent(cc.BlockInputEvents).enabled = false;
                })
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
    popToRootScene:function(){
        if(this._backStack.length<1){
            return;
        }
        while(this._backStack.length>1){
            this._backStack.pop();
        }
        var rootSceneId = this._backStack.pop();
        this.startScene(rootSceneId);
    },
    popTo:function(id){
        if(this._backStack.length<1){
            return;
        }
        var find = false;
        do{
            var lastSceneId = this._backStack.pop();
            if(lastSceneId==id){
                find=true;
            }
        } while(this._backStack.length>0 && !find)
        if(find){
            this.startScene(id);
        }
    }
});

// 添加全局变量定义
window.SceneController = new SceneController()