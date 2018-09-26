const events = require('events')
const {EventEmitter} = events
class MusicPlayer {
    constructor () {
        this.playing = false
        this._extend()
    }
    _extend() {
        for(let method in EventEmitter.prototype) {
            this[method] = EventEmitter.prototype[method]
        }
    }
}

const AudioDevice = {
    play(track) {
        console.log('play', track)
    },
    stop() {
        console.log('stop')
    }
}

const musicPlayer = new MusicPlayer()
musicPlayer.on('play', function(track) {
    
    this.playing = true
    AudioDevice.play(track)
})
musicPlayer.on('stop', function() {
    this.playing = false
    AudioDevice.stop()
})
musicPlayer.emit('play', 'some songs')
setTimeout(function() {
    musicPlayer.emit('stop')
}, 2000)
