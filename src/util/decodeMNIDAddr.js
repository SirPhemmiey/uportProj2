const MNID = require('mnid');

function decodeAddr(addr) {
    let decodedId = MNID.decode(addr)
    return decodedId.address
}

export default decodeAddr

