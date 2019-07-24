const faviconLoader = require('../index');
var path = require('path');
var assert = require('assert');

const testCases = [
    {
        testTitle:'Testcase with url http://npm.com and result option FILE_INFORMATION', 
        url:'http://npm.com', 
        imageDirPath: path.join(__dirname,'./uploads'), 
        options:{result:'FILE_INFORMATION'},
        result:{
            typ:'FILE_INFORMATION',
            exspected:{ 
                path:  path.join(__dirname,'./uploads/www.nasdaqprivatemarket.com/bestIco.png'),
                basename: 'bestIco.png',
                extention: '.png',
                mimetype: 'image/png' 
            }
        }
    },
    {
        testTitle:'Testcase with url http://www.google.com and result option FILE_DATA', 
        url:'http://www.google.com', 
        imageDirPath: path.join(__dirname,'./uploads'), 
        options:{result:'FILE_DATA'},
        result:{
            typ:'FILE_DATA',
            exspected:{ 
                resource: 'local',
                path: path.join(__dirname,'./uploads/www.google.com/bestIco.png'),
                extention: '.png',
                content_type: 'image/png',
                uridata: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAklEQVR4AewaftIAAAUgSURBVL3BfWzUhRnA8e/z/H7ctb0elypooWLryWDgXBVMEF0IwkREtzj/mSZzcRnJlrEMX/ZHmXHcbcpKiInEZMncP8w4dcl0m4tVYd2bIWPTBBs2EoYUlPBSi6Ut7d2V6z3PuniX/HI56EG6fT5CncxsNnCvu68BOoE0kORTo8BRoE9EeoE3VHWUOgjTMLPF7t4FPKCqDdTBzPLAyyLSraqHuQjhAty9ycx+DGxW1YDLYGaTwLMi8kNVzVODUIOZLXL336jqUmaAmR0QkftV9QOqCFXMbJm7v62qc6hSOnWCiT/tprj/PSY/7MdGhsEdnZ0iaE8T61xGfO16grYFVDOzQVVdJyLvEyFEmNkid9+rqnOIKJ0+yfjzzzHxzh/BnYsSIX77ahLf3kzQOp8oMxsUkdtU9QPKAsrMLOHuvaraTkRhTw+jTzzK5JF/U6/SR8covPk6wfw2wo7rqRCRhLvfkclkdmWz2UmmKGXu/iNVXUpE7pVfcG57Bi/kuVSez3H+3b9RTVVvdPcsZQFTzGwx8IKIKGWFPT2MPbeDWsL0QhruupeGOzcQv20VYXsaz+ews0NUNNzzFZKPPQEiVHP3FZlM5uVsNjsUMsXdu1Q1oKx06gRjz3ZTLZjXRvMjXcSWr6BaYuMmzr+3j3PPPE38C6tp3vQ4F6KqoZl1ARvF3VNmdlpVGygb3/k9cr/fR9SsJZ8jtW0nkkxyMZ4bR5oSTMfMciLSqu5+j6o2UOb5fuJLnid+yyAVesWVzH7qGSSZZDrSlKAeqtoEbFB3X0OED/wKAqPpzhMk7juGxJzENzehqRZmmruvCYFOInzoz1TElgwTtjUTW7ue/5HOEEgT4eMHiQo+cyuEIReydts49Xryvjirl4ZEpBVIElUcJEoaFzJTTg47VVLK/9H5SaeaAqNEzZpLlOcOM1MScaHKSAgcBa6kTJpvwIcGqDg9fJCrbJJZGlJL7w8S1HJ00Nj48zxRV6eEKv0K9BEhLXdQ8dbENTxwMk3Psb9wqf5xpES1RfMCqvSpiPQSIVd/lSIhO8Y+T/bcMgoE/PTAS3xSGKZeYwXn138vEnXtHKU1JUSJSK8Cb5hZnjJp7OBniS28VuigYqgwwiN/3cbI+XNMp1iCp347wdC4E3V3Z0iUmeVEpCfIZrMTW7duTYvIzZS1tyzld/29FG2SijOFs+z+aC8LkvNoT86nlsPDH7LlD2/zr0NpQKm4IiF0fSnOrECocPddqvpqyBQR6Tazr6tqyJR5iblsueVbPLlvJ1Gnc2d47J2f0DG7jZWtN7OguRUR4eP8J+z/+CB9Zw7hOEHbfpoGvotMtvBfm9fHaYwJFWZWFJHtTBHKSqXSDlX9PhEvHnqdne+/wOWQUpLGge/wjeWdPLwqRpSZdQdBsIUpSpmqbjWzfxLxtcVf5umVj9IUNnKpNMzx0BdP8fCqGFFm1qeqWcoCyrLZbDGTyexx9wdFJEHZ9alrubtjFUOFYY6OHseZ3vKrbqD79sdZ134rUWY2oKrrRGSQMqGKu99kZrtVdS5VTo0Psuf4Xt4dOMCRkeOcnRjBHVLxJO3J+dw097OsvWYli1uuo5qZDYjIXaraR4RQg5ktdPfXVPVGZoCZ9anq/SLST5WAGrLZ7FAmk9nl7jF3XyEiymUws6K771DVh0RkkBqEaZjZQnfvAh5U1SbqYGY54Jcisl1Vj3ARQp3MLAlscPc1QCeQBlJ8agToB/pEpFdEekRkjDr8B8RQFTY6xlI4AAAAAElFTkSuQmCC' 
            }
        }
    },
    {
        testTitle:'Testcase with url http://www.github.com and result option FILE_INFORMATION', 
        url:'http://www.github.com', 
        imageDirPath: path.join(__dirname,'./uploads'), 
        options:{result:'FILE_INFORMATION'},
        result:{
            typ:'FILE_INFORMATION',
            exspected:{ 
                path: path.join(__dirname,'./uploads/github.com/bestIco.png'),
                basename: 'bestIco.png',
                extention: '.png',
                mimetype: 'image/png' 
            }
        }
    },
    {
        testTitle:'Testcase with url http://www.notarealsite123abc.com/ and result option FILE_DATA', 
        url:'http://www.notarealsite123abc.com/', 
        imageDirPath: path.join(__dirname,'./uploads'), 
        options:{result:'FILE_DATA'},
        result:{
            typ:'error',
            exspected:false
        }
    },
    {
        testTitle:'Testcase with url empty string', 
        url:'', 
        imageDirPath: path.join(__dirname,'./uploads'), 
        options:{result:'FILE_INFORMATION'},
        result:{
            typ:'error',
            exspected:{ 
                path: path.join(__dirname,'../modules/Icon/icon.png'),
                basename: 'icon.png',
                extention: '.png',
                mimetype: 'image/png' 
            }
        }
    },

];

async function call (testCase){
    try{
        var res =  await faviconLoader(testCase.url, testCase.imageDirPath, testCase.options);
    }catch(e){
        console.log('-----')
    }
   return res;
}

describe('Start Testcases', function() {
    this.timeout(10000);
    testCases.forEach(function(testCase) {
        it(testCase.testTitle, function(done) {
            call(testCase)
            .then(function(result){
                //console.log(result)
                //console.log(testCase.result.exspected)
                assert.equal(JSON.stringify(result), JSON.stringify(testCase.result.exspected));
                done()
            }).catch(()=>{

            })
        });
    });
});
