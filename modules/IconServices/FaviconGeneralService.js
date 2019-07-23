const fs = require('fs');
const request = require('request');
const MineTypHelper = require('../Helper/MineTypHelper');
const mime = require('mime-types');

function getRequestPath(pUrl) 
{    
    return pUrl + '/favicon.ico';
}
function main(imageStorage)
{
    return  new Promise(function(resolve, reject)
    {
        var RequestUrl = getRequestPath(imageStorage.getUrl());
        request.head(RequestUrl, function(err, res, body){
            if (err) return resolve(false);
            var mineRes = res.headers['content-type'] ? mime.extension( res.headers['content-type']) : "txt";
            
            if(MineTypHelper.isTypeAllowed(mineRes)){
                if (!fs.existsSync(imageStorage.getDomainDir())){
                    fs.mkdirSync(imageStorage.getDomainDir());
                }
                var endImagePath = imageStorage.getDomainDir() + 'GeneralIcon.' + mineRes ;           
                request(RequestUrl)
                .pipe(
                    fs.createWriteStream(endImagePath)
                )
                .on('close', function(){
                    resolve(endImagePath)
                });
            }else{
                return resolve(false);
            }
        })
    });
};
module.exports = main;