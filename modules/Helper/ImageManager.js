const mime = require('mime-types');
const path = require('path');
const Datauri = require('datauri');

class ImageManager {
    constructor() {
        this.path = null;
        this.content_type = null;
        this.extention = null;
        this.basename = null;
        this.uridata = null;
        this.datauri = null
    }
    _readFile(){
        this.datauri = new Datauri(this.path);
        this.uridata = this.datauri.content;
    }
    _extructBasename(){
        this.basename = this.path ? path.basename(this.path) : null ;
    }
    _extructExtention(){
        this.extention = this.path ? path.extname(this.path) : null ;
    }
    _extructContent_Type(){
        this.content_type = this.basename ? mime.lookup(this.basename) : null ;
    }

    _process(){
        this._readFile();
        this._extructBasename();
        this._extructExtention();
        this._extructContent_Type();
    }
    _toArray(){
        var data = {
            resource: "local",
            path: this.path ,
            extention: this.extention,
            content_type: this.content_type,
            uridata: this.uridata
        };
        return data;
    }

    getImageArray(imagePath)
    {
        this.path = imagePath;
        this._process();
        return this._toArray();
    }
}
module.exports = new ImageManager();
