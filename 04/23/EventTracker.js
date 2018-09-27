
const {EventEmitter} = require('events')

class EventTracker extends EventEmitter {

}

const eventTracker = new EventTracker()
eventTracker.on('newListener', function(name, listener) {
    console.log('event name added: ', name)
})

eventTracker.on('a listener', function() {

})