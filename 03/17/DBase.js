
class DBase {
    constructor(data) {
        const {version, updated, recordNum, recordLen, headerLen} = data
        this.version = version
        this.updated = updated
        this.recordNum = recordNum
        this.recordLen = recordLen
        this.headerLen = headerLen
    }
}

export default DBase