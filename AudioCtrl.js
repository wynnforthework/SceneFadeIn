cc.Class({
    extends: cc.Component,

    properties: {
        _audioTask: null,
        _audioID: null,
    },

    setAudioTask (audio) {
        this._audioTask = audio;
    },

    playAudio () {
        // return current audio object
        this._audioID = cc.audioEngine.play(this._audioTask, false);
    },

    stopAudio () {
        cc.audioEngine.stop(this._audioID);
    },

    pauseAudio () {
        cc.audioEngine.pause(this._audioID);
    },

    resumeAudio () {
        cc.audioEngine.resume(this._audioID);
    },

    stopAllAudio () {
        cc.audioEngine.stopAll();
    },

    pauseAllAudio () {
        cc.audioEngine.pauseAll();
    },

    resumeAllAudio () {
        cc.audioEngine.resumeAll();
    },
});
