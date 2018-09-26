const events = require('events')
const domain = require('domain')
const {EventEmitter} = events
const audioDomain = domain.create()

audioDomain.on('error', function(err) {
    console.log("domain Error: ", err.message, err.stack)

})

// run 中的代码错误才会被捕获
audioDomain.run(function() {
    class MusicPlayer extends EventEmitter {
        constructor () {
            super()
            this.emit('error', new Error('init'))
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
        this.emit('error', new Error())
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
})



