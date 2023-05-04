const { resolve } = require("path");
const puppetter = require("puppeteer")
const answerObj = require('./answers')

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "maden35139@altpano.com"
const password = "12345678"

let page;
puppetter.launch({
    headless:false,
    args: ["--start-maximized"],
    defaultViewport:null
}).then(function(browser){
    let BrowserOpenPromise = browser.newPage()
    return BrowserOpenPromise
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("input[type='text']")
    return elementWaitPromise
}).then(function(){
    let emailIsEntered = page.type("input[type='text']", email, {delay: 50})
    return emailIsEntered
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("input[type='password']")
    return elementWaitPromise
}).then(function(){
    let passwordEnetred = page.type("input[type='password']", password,{delay: 50})
    return passwordEnetred
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("button[data-analytics='LoginPassword']")
    return elementWaitPromise
}).then(function(){
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']",{delay: 50})
    return loginButtonClicked
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector(".topic-name[data-automation='algorithms']")
    return elementWaitPromise
}).then(function(){
    let clickOnAlgoPromise = page.click(".topic-name[data-automation='algorithms']")
    return clickOnAlgoPromise
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("input[value='warmup']")
    return elementWaitPromise
}).then(function(){
    let clickOnWarmUpPromise = page.click("input[value='warmup']")
    return clickOnWarmUpPromise
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector(".ui-btn.ui-btn-normal.primary-cta")
    return elementWaitPromise
}).then(function(){
    //  "$" stands for query Selector
    //  "$$" stands for all query Selector 

    let allChallengePromise = page.$$(".ui-btn.ui-btn-normal.primary-cta")
    return allChallengePromise
}).then(function(questionArr){
    let questionWillBeSolved = questionSolver(page,questionArr[0],answerObj.answers[0])
    return questionWillBeSolved
})

.catch(function(err){
    console.log(err);
})


// work on individual question solver
function questionSolver(page,question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClick = question.click({delay:50})
        questionWillBeClick.then(function(){
            // waiting for the element to appear on the page
            let elementWaitPromise = page.waitForSelector(".lines-content.monaco-editor-background")
            return elementWaitPromise
        }).then(function(){
            let clickOnEditor = page.click(".lines-content.monaco-editor-background")
            return clickOnEditor
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control',{delay:50})
            return ctrlPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:50})
            return AisPressed
        }).then(function(){
            let ctrlIsUp = page.keyboard.up('Control',{delay:50})
            return ctrlIsUp
        }).then(function(){
            let backSpace = page.keyboard.press('Backspace', {delay:50})
            return backSpace
        }).then(function(){
            // waiting for the element to appear on the page
            let elementWaitPromise = page.waitForSelector(".ui-checkbox.theme-m")
            return elementWaitPromise
        }).then(function(){
            let clickOnCheckBox = page.click(".ui-checkbox.theme-m")
            return clickOnCheckBox
        }).then(function(){
            // waiting for the element to appear on the page
            let elementWaitPromise = page.waitForSelector("textarea.custominput")
            return elementWaitPromise
        }).then(function(){
            let targetOnCustomBox = page.click("textarea.custominput")
            return targetOnCustomBox
        }).then(function(){
            let codeType = page.type("textarea.custominput", answer, {delay:10})
            return codeType
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control',{delay:50})
            return ctrlPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:50})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay:50})
            return XisPressed
        }).then(function(){
            let ctrlIsUp = page.keyboard.up('Control',{delay:50})
            return ctrlIsUp
        }).then(function(){
            let clickOnEditor = page.click(".lines-content.monaco-editor-background")
            return clickOnEditor
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control',{delay:50})
            return ctrlPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V', {delay:50})
            return VisPressed
        }).then(function(){
            let ctrlIsUp = page.keyboard.up('Control',{delay:50})
            return ctrlIsUp
        }).then(function(){
            let submitCode = page.click(".ui-btn.ui-btn-normal.ui-btn-primary",{delay:50})
            return submitCode
        })
    })
}


// for wait for selector
// function waitAndClick(selector, page){
//     return new Promise(function(resolve, reject){
//         let waitForPageSelector = page.waitForSelector(selector)
//         waitForPageSelector.then(function(){
//             let clickModel = page.click(selector)
//             return clickModel
//         }).then(function(){
//             resolve()
//         }).catch(function(){
//             reject()
//         })
//     })
// }


// .then(function(){
//     // wait for all content by 3 second as my choice
//     let waitFor3Seccond = page.waitFor(3000)
//     return waitFor3Seccond
// })