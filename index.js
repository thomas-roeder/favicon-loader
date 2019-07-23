const FaviconKitService = require('./modules/IconServices/FaviconKitService');
const FaviconGeneralService = require('./modules/IconServices/FaviconGeneralService');
const PageIconService = require('./modules/IconServices/PageIconService');
const UrlService = require('./modules/Helper/UrlHelper')
const StorageHelper = require('./modules/Helper/StorageHelper')
const ResultHelper = require('./modules/Helper/ResultHelper')

async function download(imageStorage) 
{
    var pageIconFunc = PageIconService(imageStorage);
    var faviconkitFunc = FaviconKitService(imageStorage);
    var faviconGeneralFunc = FaviconGeneralService(imageStorage);

    await pageIconFunc;
    await faviconkitFunc;
    await faviconGeneralFunc;

    var bestIcon = await imageStorage.findBestIcon();
    if(bestIcon){
        return bestIcon
    }
    return false;
}

async function main(pPageUrl, pImageDirPath ,pOptions = {})
{
    var imageStorage = new StorageHelper(pPageUrl, pImageDirPath);
    var resultOption = pOptions.hasOwnProperty("result") ? pOptions.result : false;
    var resultHelper = new ResultHelper(resultOption);

    if(!imageStorage.getUrl()){
        return await resultHelper.handleResult(imageStorage.getDefaultIcon());
    }

    var urlexists = await UrlService.checkUrlExists(imageStorage.getUrl());
    if(!urlexists){
        return urlexists;
    }

    var redirections = await UrlService.checkRedirects(imageStorage.getUrl());
    if(redirections){
        imageStorage.updateUrl(redirections)
    }

    var imagePath = await imageStorage.findIcon();

    if(!imagePath){
        await download(imageStorage);
        var imagePath = await imageStorage.findIcon();
        if(!imagePath){
            return await resultHelper.handleResult(imageStorage.getDefaultIcon());
        }
    }
    var data = await resultHelper.handleResult(imagePath);
    return data;
}
module.exports = main;