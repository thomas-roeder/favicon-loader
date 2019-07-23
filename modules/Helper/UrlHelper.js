const url = require('url')
const request = require('request')
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;


module.exports.checkUrlExists = function (pUrl)
{
    return  new Promise(function(resolve, reject){
        request.head(pUrl, function(err, res, body){
            if (err) {
                return resolve(false)
            }
            if(res.statusCode == 404 || res.statusCode == 500){
                return resolve(false);
            }
            return resolve(true);
        })
    });
}
module.exports.checkRedirects = function checkRedirects(pUrl)
{
    return new Promise(function(resolve, reject)
    {
        //pUrl = 'http://www.bitly.com/UHfDGO';
        var finalUrl = pUrl;
        var urlObj = url.parse(finalUrl);
        
        if(urlObj.protocol == 'https:'){
            var responseObj =  https.get(pUrl);
        }else{
            var responseObj =  http.get(pUrl);
        }

        responseObj.on('response',(response)=>{
            if(response.responseUrl){
                resolve(response.responseUrl)
            }
            resolve(false)
        });

        responseObj.on('error', function (err) {
            resolve(false)
        });  
    })
}
