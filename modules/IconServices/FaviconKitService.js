const fs = require('fs');
const request = require('request');
const mime = require('mime-types');
const MineTypHelper = require('../Helper/MineTypHelper');

function getRequestPath(pDomain) 
{    
    return "https://api.faviconkit.com/" + pDomain + "/144";
}
function main(imageStorage)
{
    return  new Promise(function(resolve, reject)
    {
        var RequestUrl = getRequestPath(imageStorage.getDomain());

        request.head(RequestUrl, function(err, res, body){
            if (err) return resolve(false);
            var mineRes = res.headers['content-type'] ? mime.extension( res.headers['content-type']) : "txt";

            if(MineTypHelper.isTypeAllowed(mineRes)){
                if (!fs.existsSync(imageStorage.getDomainDir())){
                    fs.mkdirSync(imageStorage.getDomainDir());
                }
                var endImagePath = imageStorage.getDomainDir() + 'FaviconKit.' + mineRes ;           
                request(RequestUrl)
                .pipe(
                    fs.createWriteStream(endImagePath)
                )
                .on('close', function(){
                    resolve(endImagePath)
                });
            }else{
                resolve(false);
            }
        })
    });
};
module.exports = main;