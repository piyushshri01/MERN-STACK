const fs = require("fs")
// method 1 for read json file data is readFileSync then parse to get data
// method 2 is require(import json) file and get data without parse
// let strData = require("./json.json")
// console.log(data);


// buffer 
let buffer = fs.readFileSync("./json.json")
// console.log(strData);

// data parse into buffer to string
let strData = JSON.parse(buffer)
console.log(strData);

// in json file i saved data in arr so i push another value bu push method
strData.push(
    {
        "Name": "XYZ",
        "SName": "ijk",
        "bool": true,
        "arr": ["city","state","country"],    
    }
) 
// change data string format
let stringfiy = JSON.stringify(strData)
// so now add data via wirtesynce method to json file
fs.writeFileSync("./json.json", stringfiy)
// console.log(strData);