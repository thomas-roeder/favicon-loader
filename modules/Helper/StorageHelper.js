const url = require('url')
const path = require('path')
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const sizeOf = require('image-size');

function StorageHelper (pUrl, pMainImageDirPath)
{
    this.urlObj =  url.parse(pUrl, true);
    this.url = pUrl;
    this.mainImageDirPath = pMainImageDirPath;
    this.defaultIcon = path.join(__dirname, '../Icon/icon.ico');

    this.getIconPath = (filenameInclExt) =>{
        return path.join(this.mainImageDirPath, this.urlObj.host) + '/' + filenameInclExt;
    }

    this.getDomainDir = () =>{
        return path.join(this.mainImageDirPath, this.urlObj.host) + '/'
    }

    this.updateUrl = (pUrl) =>{
        this.urlObj =  url.parse(pUrl, true);
        this.url = pUrl;
        return;
    }

    this.updateMainImageDirPath = (pMainImageDirPath) =>{
        this.mainImageDirPath = pMainImageDirPath;
        return;
    }

    this.getUrl = () =>{
        if(this.urlObj.host && this.urlObj.protocol){
            return this.urlObj.protocol + "//" + this.urlObj.host
        }
        return false;
    }

    this.getDomain = () =>{
        return this.urlObj.host || false;
    }

    this.getDefaultIcon = () =>{    
        return this.defaultIcon;
    }

    this.getImagesOfDomainFolder = async () =>{

        if (await fs.existsSync(this.getDomainDir())) {
            try{
                return await readdir(this.getDomainDir())
            }catch(e){
                console.log(e);
            }
        }
        return false;
    }

    this.findBestIcon = async  () =>{

        var imagesAndSize = [];
        var imagesOfFolder = await this.getImagesOfDomainFolder();
        if(!imagesOfFolder){
            return false;
        }
        for(var i =0; i < imagesOfFolder.length;i++){
            var imageFile = imagesOfFolder[i];
            var ext = path.extname(imageFile);
            var basename = path.basename(imageFile, ext);
            var imageSizeObj = this.createImageSizeObj(imageFile, basename, ext);
            if(imageSizeObj){
                imagesAndSize.push(imageSizeObj)
            }
            imageSizeObj = null;
        }
        if(imagesAndSize.length == 0){
            return false;
        }
        imagesAndSize.sort(function(a, b){return b.width - a.width});
        var from = this.getDomainDir() + imagesAndSize[0].file;
        var to = this.getDomainDir() + 'bestIco' + imagesAndSize[0].ext;
        var resultFile = await fs.copyFileSync(from,to);
        return resultFile;
    }

    this.findIcon = async  () =>{

        var images = await this.getImagesOfDomainFolder();
        if(!images){
            return false;
        }
        for(var i =0; i < images.length;i++){
            var image = images[i];
            var ext = path.extname(image);
            var basename = path.basename(image, ext);
            if(basename == 'bestIco'){
                return this.getDomainDir() + image;
            }
        }
        return false;
    }

    this.createImageSizeObj = function (imageFile, basename, ext)
    {
        var imagePath = this.getDomainDir() + imageFile;
        var ImageSizeObj = {
            file: imageFile,
            name: basename,
            ext: ext
        }
        if(ext == '.ico'){
            try{            
                var images = sizeOf(imagePath).images;
            }catch(e){
                console.log(e)
                return false;
            }

            if(typeof images == 'array'){
                for (const dimensions of images) {
                    return Object.assign({}, ImageSizeObj, {width: dimensions.width,height: dimensions.height})
                }
            }else{
                var dimensions = sizeOf(imagePath);
                if(dimensions){
                    return Object.assign({}, ImageSizeObj, {width: dimensions.width,height: dimensions.height})
                }
            }
        }else{
            try{            
                var dimensions = sizeOf(imagePath);
            }catch(e){
                console.log(e); 
                return false;
            }
            if(dimensions){
                return Object.assign({}, ImageSizeObj, {width: dimensions.width,height: dimensions.height})
            }
            return false;
        }
    }
}

module.exports = StorageHelper;