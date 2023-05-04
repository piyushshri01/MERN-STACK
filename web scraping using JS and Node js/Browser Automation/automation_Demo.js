const puppeteer = require("puppeteer")
let page;
const BrowserOpenPromise = puppeteer.launch({ headless: false, slowMo: true, defaultViewport:null, args:["--start-maximized"]})
BrowserOpenPromise.then(function (brwoser){
    // currently opened tab
    let pagesArrPromise = brwoser.pages()
    return pagesArrPromise
}).then(function(browserPages) {
    page = browserPages[0]
    let gotoPromise = page.goto("https://www.google.co.in/")
    return gotoPromise
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("input[type='text']", {visible:true})
    return elementWaitPromise
    
}).then(function(){
    // select search box and give input which we want to search 
    // type any element on that page by class selector or selector
    let keysWillBeSendPromise = page.type("input[type='text']", "pepcoding")
    return keysWillBeSendPromise
    
}).then(function(){
    // page.keyboard to type speacial character
    let enterWillBePressed = page.keyboard.press("Enter")
    return enterWillBePressed
}).then(function(){
    // waiting for the element to appear on the page
    let elementWaitPromise = page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", {visible:true})
    return elementWaitPromise
    
}).then(function(){
    // Mouse
    let keysWillBeSendPromise = page.click("h3.LC20lb.MBeuO.DKV0Md")
    return keysWillBeSendPromise
    
}).catch(function(err){
    console.log(err);
})