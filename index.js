const http = require('http')
const CountStream = require('./countstream')
const countStream = new CountStream('book')

http.get('http://www.manning.com', function(res) {
    res.pipe(countStream)
})

countStream.on('total', function(count) {
    console.log('total matches', count)
})