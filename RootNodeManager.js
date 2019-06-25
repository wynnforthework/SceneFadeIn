// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _MusicData:null,
        _MusicDict:null,
        _ctrl : null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        var scene = cc.director.getScene();
        var canvas = scene.getChildByName("Canvas");
        this.node.height = canvas.height;
        this.node.y = canvas.y;
        console.log("rootnode")
    },

    start () {
        
        var _this = this;
        _this._ctrl = _this.getComponent("AudioCtrl");
        // cc.loader.loadRes("config/Music", cc.JsonAsset, function (err, res) {
        //     _this._MusicData = res.json.root.Music;
            
        // });
        cc.loader.loadResDir('music/', function (count, totalCount, res) {
 
        }, function (err, res) {
            if (err == null) {
                _this._MusicDict = {};
                res.forEach(clip => {
                    _this._MusicDict[clip.name] = clip;
                });

                GLOBAL.BGM_ID = cc.audioEngine.play(_this._MusicDict[GLOBAL.MUSIC.BGM],true,1);
                // _this._ctrl.setAudioTask(_this._MusicDict["BGM"]);
                // _this._ctrl.playAudio();
            } else {
                console.error(err);
            }
        })
    },

    // update (dt) {},
    playAudio(clipName){
        this._ctrl.setAudioTask(this._MusicDict[clipName]);
        this._ctrl.playAudio();
    },
});
