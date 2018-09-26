
function merge(a, b) {
    if(a && b) {
        for(let key in b) {
            a[key] = b[key]
        }
    }
    return a
}

const a = {name: 'qinghe'}
const b = {
    say() {
        console.log('say', this.name)
    }   
}

merge(a, b)
a.say()