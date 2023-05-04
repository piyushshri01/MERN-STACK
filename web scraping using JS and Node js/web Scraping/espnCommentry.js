const axios = require("axios")
const cheerio = require("cheerio")

url = "https://www.espncricinfo.com/series/india-in-west-indies-2022-1317885/west-indies-vs-india-3rd-odi-1317902/ball-by-ball-commentary";

axios.get(url).then((response) => {
    dataParse(response.data)
});

function dataParse(html){
    let tool = cheerio.load(html)
    let content = tool("div.ds-ml-4")
    for(let i = 0; i < content.length; i++){
        data = tool(content[i]).text()
        console.log(data);
    }
}