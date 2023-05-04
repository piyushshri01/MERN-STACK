const axios = require("axios")
const cheerio = require("cheerio")

//  URL of IPL 
const URL = "https://www.espncricinfo.com"
const URL1 = "/series/indian-premier-league-2022-1298423" 
axios.get(URL+URL1).then((resolve) =>{
    mainUrl(resolve.data)
});

function mainUrl(html){
    let $ = cheerio.load(html)
    let getUrlofAllTeams = $(".ds-block.ds-text-center").attr("href");
    const completeUrl = URL+getUrlofAllTeams;
    // fetch data via all teams URL
    axios.get(completeUrl).then((resolve) =>{
        ViaAllTeamsURL(resolve.data)
    })
}

function ViaAllTeamsURL(html){
    let $ = cheerio.load(html)
    let AllTeamsScoreCardDiv = $(".ds-flex.ds-mx-4")
    for(let i = 0; i < AllTeamsScoreCardDiv.length; i++){
        let teamScoreCardURL = $(AllTeamsScoreCardDiv[i]).find(".ds-inline-flex.ds-items-center.ds-leading-none")
        let linkUnderSpan = $(teamScoreCardURL[2]).find(".ds-text-ui-typo.ds-underline-offset-4").attr("href")
        const scoreCardURL = URL+linkUnderSpan
        // Now we will fetch data via scoreCard URL
        axios.get(scoreCardURL).then((resolve)=>{
            getDataViaScoreCardUrl(resolve.data)
        })
    }
}

function getDataViaScoreCardUrl(html){
    let $ = cheerio.load(html)
    let inningsArr = $(".ds-bg-fill-content-prime.ds-rounded-lg")
    // team names
    let teamNames = []
    for(let i = 0; i < inningsArr.length;i++){
        // team names
        let teamTitle = $(inningsArr[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase")
        let teamName = teamTitle.text()
        teamName = teamName.split("INNINGS")[0].trim().toLowerCase()
        teamNames.push(teamName)
    }
    // get vemue name from MATCH DETAILS
    let venues = $(".ds-w-full.ds-table.ds-table-sm.ds-table-auto").find(".ds-text-tight-s.ds-font-medium")
    let venue = $(venues[0]).text()
    // select team score board
    // let inningsArr = $(".ds-bg-fill-content-prime.ds-rounded-lg")
    for(let inn = 0; inn < inningsArr.length;inn++){
        // select batting table from score table
        let batsmanTbl = $(inningsArr[inn]).find(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table")
        for(let i = 0; i < batsmanTbl.length; i++){
            // find <tbody></tbody> of all <tr></tr>
            let allBatsMan = $(batsmanTbl[i]).find("tr")
            // all tr in allBatsMan Arr
            for(let i = 0; i < allBatsMan.length;i++){
              // first td is bowlers name and 5th td is number of wickets
              let allColsOfPlayer = $(allBatsMan[i]).find("td").not(".ds-min-w-max.!ds-py-2")
              let batsManName = $(allColsOfPlayer[0]).find("a").text().trim().split(" ")
              // console.log(i, batsManName);
              if(batsManName[0] != ""){
                batsManName = batsManName.join(" ")

                let Run = $(allColsOfPlayer[2]).text().trim()
                let Balls = $(allColsOfPlayer[3]).text().trim()
                let Fours = $(allColsOfPlayer[5]).text().trim()
                let Sixs = $(allColsOfPlayer[6]).text().trim()
                let StrikeRate = $(allColsOfPlayer[7]).text().trim()

                if(inn%2 == 0){
                    console.log(batsManName,teamNames[0],teamNames[1],venue, Run, Balls, Fours, Sixs, StrikeRate);
                }else{
                    console.log(batsManName,teamNames[1],teamNames[0],venue, Run, Balls, Fours, Sixs, StrikeRate);
                }  
              } 
            }
        }
      }

}

// for Date class
// ds-text-tight-m ds-font-regular ds-text-ui-typo-mid
