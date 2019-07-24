# @th.r/favicon-loader
The Library downloads the best favicon of the requested Website.

that includes the following behavior:
- the Library follows the redirect of the requested website
- if the requested website is not available or the icon could not read from the Website the library returns a ```default icon ```.
- if the library gets any problem with write access to the given imageFolderPath it will ``` return false``` . 

## Install 

```shell
$ npm i @th.r/favicon-loader
```
## Usage
```js
const faviconLoader = require('@th.r/favicon-loader');
const path = require('path');

var requestUrl = "http://www.github.com";
var imageFolder = path.join(__dirname,'../uploads/')

faviconLoader(requestUrl, imageFolder)
.then(function(res){
    console.log(res)
})
/* Result
    { 
        path: '/Users/path/to/the/icon/bestIco.png',
        basename: 'bestIco.png',
        extention: '.png',
        mimetype: 'image/png' 
    }
*/
```

# Options
Also, you can define some options.
## Result option
```js
var options = {
    result: 'FILE_INFORMATION'
};

faviconLoader(requestUrl, imageFolder, options)
.then(function(res){
    console.log(res)
})
```

### Result options 'FILE_INFORMATION'
FILE_INFORMATION forces that the result comes as a file information object.
```js
{ 
    path: '/Users/path/to/the/icon/bestIco.png',
    basename: 'bestIco.png',
    extention: '.png',
    mimetype: 'image/png' 
}
```

### Result options 'FILE_DATA'
FILE_DATA forces that the result comes as a file data object. So that you have not to load the file afterwards.
```js
{
    resource: 'local',
    path: '/Users/path/to/the/icon/bestIco.png',
    extention: '.png',
    content_type: 'image/png',
    uridata: 'data:image/png;base64,iVBOR…….TkSuQmCC' 
}
```
## Default Icon option
You can define your own default icon.
```js
var options = {
    result: 'FILE_DATA',
    default_icon: path.join(__dirname,'./default.png')
};

faviconLoader(requestUrl, imageFolder, options)
.then(function(res){
    console.log(res)
})
```