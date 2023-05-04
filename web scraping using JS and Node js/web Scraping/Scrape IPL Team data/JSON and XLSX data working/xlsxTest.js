const fs = require("fs")
const xlsx = require("xlsx")


let data = require("./json.json")
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


