const fs = require('fs')
const log = console.log

const FieldType = {
    C: 'Character',
    N: 'Numeric'
}

function binary2DBase(path) {
    const handleBinary = function(buf) {
        // version 0
        const version = buf[0]

        // updated 1 ~ 3
        const date = new Date()
        date.setFullYear(1900 + buf[1])
        date.setMonth(buf[2])
        date.setDate(buf[3])
        const updated = date.toString()

        // record num 4 ~ 8
        const recordNum = buf.readUInt32LE(4)

        // header len 8 ~ 10
        const headerLen = buf.readUInt16LE(8)

        // record len 10 ~ 12
        const recordLen = buf.readUInt16LE(10)

        // field
        const fields = []
        let fieldOffset = 32
        const fieldTerminator = 0x0D
        while(buf[fieldOffset] !== fieldTerminator) {
            const field = {}
            const fieldBuf = buf.slice(fieldOffset, fieldOffset + 32)
            field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '')
            field.type = FieldType[fieldBuf.toString('ascii', 11, 12)]
            fields.push(field)
            field.length = fieldBuf[16]
            fieldOffset += 32
        }

        // record
        const records = []
        for(let i = 0; i < recordNum; i++) {
            let recordOffset = headerLen + (i * recordLen)
            const record = {}
            record._isDel = buf.readUInt8(recordOffset) == 0x2A
            recordOffset ++
            for(let j = 0; j < fields.length; j++) {
                field = fields[j]
                const Type = field.type === 'Numeric' ? Number : String
                record[field.name] = Type(buf.toString('utf8', recordOffset, recordOffset + field.length).trim())
                recordOffset += field.length
            }
            records.push(record)
        }

        const data = {version, updated, recordNum, headerLen, recordLen, fields, records}
        log(data)
        return data
    }
    fs.readFile(path, function(err, buf) {
        const data = handleBinary(buf)
        fs.writeFileSync('./DBase.json', JSON.stringify(data))
    })
}

binary2DBase('./world.dbf')