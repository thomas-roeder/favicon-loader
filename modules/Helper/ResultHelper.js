const FileInformation = require('./FileInformation')
const ImageManager = require('./ImageManager')

function ResultHelper (pResultOption)
{
    this.resultOption =  pResultOption;

    this.handleResult = (iconPath) =>{
        switch(this.resultOption){
            case 'FILE_INFORMATION':
                return FileInformation.getInfo(iconPath);
                break
            case 'FILE_DATA':
                return ImageManager.getImageArray(imageStorage.getDefaultIcon());
                break
            default:
                return FileInformation(iconPath);
        }
    }
}

module.exports = ResultHelper;