const events = require('events')
const {EventEmitter} = events
class MusicPlayer extends EventEmitter {
    constructor () {
        super()
        this.playing = false
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
    this.emit('error', new Error())
    AudioDevice.stop()
})
musicPlayer.on('error', function(err) {
    console.log("Error: ", err.message, err.stack)
})
musicPlayer.emit('play', 'some songs')
setTimeout(function() {
    musicPlayer.emit('stop')
}, 2000)
