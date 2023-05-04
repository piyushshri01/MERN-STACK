const axios = require("axios");
const cheerio = require("cheerio");

url =
  "https://www.espncricinfo.com/series/india-in-west-indies-2022-1317885/west-indies-vs-india-3rd-odi-1317902/full-scorecard";

axios.get(url).then((response) => {
  dataExtractor(response.data);
});

async function dataExtractor(html) {
  let tool = cheerio.load(html); 
  // select team score board
  let inningsArr = tool(".ds-bg-fill-content-prime.ds-rounded-lg")
  for(let i = 0; i < inningsArr.length;i++){
      // select batting table from score table
      let batsmanTbl = tool(inningsArr[i]).find(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table")
      for(let i = 0; i < batsmanTbl.length; i++){
          // find <tbody></tbody> of all <tr></tr>
          let allBatsMan = tool(batsmanTbl[i]).find("tr")
          // all tr in allBatsMan Arr
          for(let i = 0; i < allBatsMan.length;i++){
            // first td is bowlers name and 5th td is number of wickets
            let allColsOfPlayer = tool(allBatsMan[i]).find("td").not(".ds-min-w-max.!ds-py-2")
            let batsManName = tool(allColsOfPlayer[0]).find("a").text().trim().split(" ")
            // console.log(i, batsManName);
            if(batsManName[0] != ""){
              batsManName = batsManName.join(" ")
              let batsManLink = tool(allColsOfPlayer[0]).find("a").attr("href");
              let forDetailsLink = "https://www.espncricinfo.com"+batsManLink;
              // console.log(i,batsManName, batsManLink);
              let batsManDOB = getDataOfeachBatsMan(forDetailsLink, batsManName)
              console.log(i,batsManName, forDetailsLink);
            } 
          }
      }
      

    }
    
  }

async function getDataOfeachBatsMan(batsManLink, batsManName){
  axios.get(batsManLink).then((response) => {
    // redirect to this details page and pass the html
    batsManDetails(response.data, batsManName)
  });
}

async function batsManDetails(html, playerName){
  let $ = cheerio.load(html)
  let details = $(".ds-grid-cols-2.ds-gap-4.ds-mb-8 div")
  for(let i = 0; i < details.length; i++){
    let allPs = $(details[i]).find("p").text()
    if (allPs == "Born"){
      let DOB = $(details[i]).find("span h5").text()
      console.log(playerName,DOB);
    }
  }  
}