var HeartBeatAudio = (function() {
    var audio = document.getElementById('heartbeatAudio');
    audio.playbackRate = 0.5;
    audio.play();
    return audio;
})();