const mime = require('mime-types');
const path = require('path');

function getBasename(pPath){
    return pPath ? path.basename(pPath) : null ;
}
function getExtention(pPath){
    return pPath ? path.extname(pPath) : null ;
}
function getMimetype(pPath){
    return pPath ? mime.lookup(getBasename(pPath)) : null ;
}

module.exports.getInfo = function (pPath)
{
    return {
        path: pPath ,
        basename: getBasename(pPath),
        extention: getExtention(pPath),
        mimetype: getMimetype(pPath),
    };
}
