const { resolve } = require("path");
const puppetter = require("puppeteer")
const answerObj = require('./answers')

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "maden35139@altpano.com"
const password = "12345678";

(async function(){
    try{
        let browserInstance = await puppetter.launch({
            headless:false,
            args: ["--start-maximized"],
            defaultViewport:null
        })
        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink)
        await newTab.type("input[type='text']", email, {delay: 50})
        await newTab.type("input[type='password']", password,{delay: 50})
        await newTab.click("button[data-analytics='LoginPassword']",{delay: 50})


        await waitAndClick(".topic-name[data-automation='algorithms']", newTab)
        await waitAndClick("input[value='warmup']", newTab)
        let questionArr = await newTab.$$(".ui-btn.ui-btn-normal.primary-cta")
        await questionSolver(newTab,questionArr[0],answerObj.answers[0])
        
    }
    catch(err){
        console.log(err);
    }
})()

async function questionSolver(page,question, answer){
    await question.click()
    await waitAndClick(".lines-content.monaco-editor-background", page)
    await page.keyboard.down('Control',{delay:50})
    await page.keyboard.press('A', {delay:50})
    await page.keyboard.up('Control',{delay:50})
    await page.keyboard.press('Backspace', {delay:50})

    await waitAndClick(".ui-checkbox.theme-m", page)
    await waitAndClick("textarea.custominput",page)
    await page.type("textarea.custominput", answer, {delay:10})
    await page.keyboard.down('Control',{delay:50})
    await page.keyboard.press('A', {delay:50})
    await page.keyboard.press('X', {delay:50})
    await page.keyboard.up('Control',{delay:50})

    
    await page.click(".lines-content.monaco-editor-background")
    await page.keyboard.down('Control',{delay:50})
    await page.keyboard.press('V', {delay:50})
    await page.keyboard.up('Control',{delay:50})
    await page.click(".ui-btn.ui-btn-normal.ui-btn-primary",{delay:50})
}

// for wait for selector
async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector)
    let selectorClicked = cPage.click(selector)
    return selectorClicked   
}