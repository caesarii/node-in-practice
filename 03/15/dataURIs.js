const fs = require('fs')
function dataURIs(path) {
    const mime = 'image/png'
    const encoding = 'base64'
    const data = fs.readFileSync(path).toString(encoding)
    const uri =  `data:${mime};${encoding},${data}`
    return uri
}

function writeDataURIs(uri, name) {
    const encoding = 'base64'
    const data = uri.split(',')[1]
    console.log(data)
    const buf = Buffer.from(data, encoding)
    fs.writeFileSync(`./${name}`, buf)
}

const uri = dataURIs('./hover.png')
writeDataURIs(uri, 'new-hover.png')
console.log(uri)