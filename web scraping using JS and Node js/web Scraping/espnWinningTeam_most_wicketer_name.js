const axios = require("axios");
const cheerio = require("cheerio");

url =
  "https://www.espncricinfo.com/series/india-in-west-indies-2022-1317885/west-indies-vs-india-3rd-odi-1317902/full-scorecard";

axios.get(url).then((response) => {
  dataExtractor(response.data);
});

function dataExtractor(html) {
  let tool = cheerio.load(html);
  let content = tool(
    ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
  );
  // collect data of which team is won
  data = tool(content[0]).text();
  // extract data 1st word which is name of winning team
  convertToArr = data.split(" ");
  winningTeam = convertToArr[0].trim().toLowerCase();
  // console.log(winningTeam);
 
  // select winning team score board
  let inningsArr = tool(".ds-bg-fill-content-prime.ds-rounded-lg")
  let htmlStr = ""
  for(let i = 0; i < inningsArr.length;i++){
    // let chtml = tool(inningsArr[i]).html()
    // htmlStr += chtml

    //  select winning Team 
    let teamTitle = tool(inningsArr[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase")
    let teamName = teamTitle.text()
    teamName = teamName.split("INNINGS")[0].trim().toLowerCase()
    // choose winning team table 
    if (teamName == winningTeam){
      console.log(teamName);
      // now we will select bowling table from winning table
      bowlingTbl = tool(inningsArr[i]).find(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed").not(".ci-scorecard-table")
      // find <tbody></tbody> of all <tr></tr>
      let allBowlers = tool(bowlingTbl).find("tr")
      // all tr in allBowlers Arr
      for(let i = 0; i < allBowlers.length;i++){
        // first td is bowlers name and 5th td is number of wickets
        let allColsOfPlayer = tool(allBowlers[i]).find("td")
        let bowlerName = tool(allColsOfPlayer[0]).text().trim().split(" ")
        let bowlerWicket = tool(allColsOfPlayer[4]).text().trim().split(" ")
        // console.log(i, bowlerName);
        if(bowlerWicket[0] !== "" && bowlerName[0] != ""){
          bowlerName = bowlerName.join(" ")
          bowlerWicket = bowlerWicket.join(" ")
          console.log(i,bowlerName, bowlerWicket);
        }
        

      }

    }
    
  }
  // console.log(htmlStr);
}
