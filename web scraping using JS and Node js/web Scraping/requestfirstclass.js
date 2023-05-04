let axios = require("axios")
let cheerio = require('cheerio');

axios.get('https://www.worldometers.info/coronavirus/').then((response) => {    
    dataCollect(response.data)
  });

function dataCollect(body){
    // console.log(body);
    let seltool = cheerio.load(body);
    // console.log(seltool);

    let contentArr = seltool('div.maincounter-number span')
    // console.log(contentArr);
    for (let i = 0; i < contentArr.length; i++){
        let data = seltool(contentArr[i]).text()
        console.log(data);
    }
}