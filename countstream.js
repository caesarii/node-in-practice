const Writable = require('stream').Writable
const util = require('util')

function CountStream(matchText, options) {
    Writable.call(this, options)
    this.count = 0
    this.matcher = new RegExp(matchText, 'ig')
}

util.inherits(CountStream, Writable)

CountStream.prototype._write = function(chunk, encoding, cb) {
    console.log('chunk', chunk.toString())
    const matches = chunk.toString().match(this.mather)
    if(matches) {
        this.count += matches.length
    }
    cb()
}

CountStream.prototype.end = function () {
    this.emit('total', this.count)
}



module.exports = CountStream