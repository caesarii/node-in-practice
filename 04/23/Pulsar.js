const {EventEmitter} = require('events')

class Pulsar extends EventEmitter {
    constructor (speed, times) {
        super()
        const self = this
        this.speed = speed
        this.times = times
        this.on('newListener', function(eventName, listener) {
            if(eventName === 'pulse') {
                self.start()
            }
        })
    }
    start() {
        const self = this
        const id = setInterval(function() {
            self.emit('pulse')
            self.times--
            if(self.times === 0) {
                clearInterval(id)
            }
        }, this.speed)
    }
    stop() {
        if(this.listeners('pulse').length === 0) {
            throw new Error('no listners')
        }
    }
}

const p = new Pulsar(500, 5)
// p.on('pulse', function() {
//     console.log('.')
// })
p.stop()