const fs = require('fs');
const pageIcon = require('page-icon');

async function main(imageStorage)
{
    return await pageIcon(imageStorage.getUrl())
    .then(function(icon) {
		if(icon){            
            var imagePathEnd = imageStorage.getDomainDir() + 'PageIcon' + icon['ext'] ;           
            if (!fs.existsSync(imageStorage.getDomainDir())){
                fs.mkdirSync(imageStorage.getDomainDir());
            } 
            fs.writeFileSync(imagePathEnd, icon['data']);
            return imagePathEnd;
        }else{
            return false;
		}
    })
    .catch(error => {
        return false;
    });
} 
module.exports = main;
