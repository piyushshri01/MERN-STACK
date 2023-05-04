const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const xlsx = require("xlsx")
const path = require("path")

// create ipl folder
const iplPath = path.join(__dirname, "ipl")
dirCreator(iplPath)

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
    // for(let i = 0; i < AllTeamsScoreCardDiv.length; i++){
        let teamScoreCardURL = $(AllTeamsScoreCardDiv).find(".ds-inline-flex.ds-items-center.ds-leading-none")
        let linkUnderSpan = $(teamScoreCardURL[2]).find(".ds-text-ui-typo.ds-underline-offset-4").attr("href")
        const scoreCardURL = URL+linkUnderSpan
        // Now we will fetch data via scoreCard URL
        axios.get(scoreCardURL).then((resolve)=>{
            getDataViaScoreCardUrl(resolve.data)
        })
    // }
}

function getDataViaScoreCardUrl(html){
    let $ = cheerio.load(html)
    // winning team Name
    let content = $(
        ".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title"
      );
      // collect data of which team is won
      let data = $(content[0]).text();
      // extract data 1st word which is name of winning team
      let convertToArr = data.split(" ");
      let winningTeam = convertToArr[0].trim().toLowerCase();

    // inning Teams Data
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
                    let ownTeamName = teamNames[0]
                    let opponent = teamNames[1]
                    // console.log(batsManName,ownTeamName,opponent,venue, Run, Balls, Fours, Sixs, StrikeRate,winningTeam);
                    processPlayer(ownTeamName, batsManName, opponent, Run, Balls, Fours, Sixs, StrikeRate,winningTeam,venue)
                }else{
                    let ownTeamName = teamNames[1]
                    let opponent = teamNames[0]
                    // console.log(batsManName,ownTeamName,opponent,venue, Run, Balls, Fours, Sixs, StrikeRate,winningTeam);
                    processPlayer(ownTeamName, batsManName, opponent, Run, Balls, Fours, Sixs, StrikeRate,winningTeam,venue)
                }  
              } 
            }
        }
      }

}


function processPlayer(teamName, playerName, opponent, Run, Balls, Fours, Sixs, StrikeRate,result,venue){
    // create Team folder
    let teamPath = path.join(__dirname,"ipl",teamName)
    dirCreator(teamPath)
    // Read data from file path
    let filePath = path.join(teamPath,playerName+".xlsx")
    let content = ReadExcelData(filePath, playerName)
    let playerObj = {
        teamName, playerName, opponent, Run, Balls, Fours, Sixs, StrikeRate,result,venue
    }
    content.push(playerObj)
    // write data in excel file
    excelWrite(filePath, content, playerName)
    

}

// make a folder function 
function dirCreator(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath)
    }
}

// excel read and write functions
function excelWrite(filePath, jsonData, sheetName){
    // filePath = "xlsx.xlsx"
    // sheetName = "sheet-1"

    // create xlsx and Write Data in xlsx 
    // create new worksheet xlsx file by book_new() function
    let newWB = xlsx.utils.book_new();
    // convert data json to xlsx sheet format by json_to_sheet()
    let newS = xlsx.utils.json_to_sheet(jsonData)
    // newWorkBook, worksheet, nameOfsheet
    xlsx.utils.book_append_sheet(newWB, newS, sheetName)
    // now write data 
    xlsx.writeFileSync(newWB, filePath)

}

function ReadExcelData(filePath, sheetName){
    // filePath = "./generateFileWithData.xlsx"
    // sheetName = "sheet-1"
    if ((fs.existsSync(filePath)) == false){
        return []
    }
    // Read data from xlsx file
    let wb = xlsx.readFile(filePath)
    let excelData = wb.Sheets[sheetName]
    let ans = xlsx.utils.sheet_to_json(excelData)
    // console.log(ans);
    return ans
}

