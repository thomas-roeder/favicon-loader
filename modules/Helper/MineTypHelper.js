module.exports.isTypeAllowed = function (type) 
{   
    var allowedTypes = ["bmp","cur","gif","icns","ico","jpeg","jpg","png","psd","tiff","webp","svg","dds"];
    return allowedTypes.includes(type);
}
