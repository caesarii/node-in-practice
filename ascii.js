
function ascii() {
    const l = 127
    let ascii = ''
    for(let i = 0; i < l; i++) {
        ascii += `${i} : ${String.fromCodePoint(i)} \n `
    }
    return ascii
}

console.log(ascii())