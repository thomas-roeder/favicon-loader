//const faviconLoader = require('@th.r/favicon-loader');
const faviconLoader = require('../index');

const path = require('path');

var requestUrl = "www.github1111111111.com";
var imageFolder = path.join(__dirname,'../test/uploads/')

var options = {
    result: 'FILE_DATA',
    default_icon: path.join(__dirname,'../test/default.png')
};

    faviconLoader(requestUrl, imageFolder, options)
    .then(function(res){
        console.log(res)
    })