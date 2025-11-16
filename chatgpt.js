const env = require('dotenv').config({ quiet: true });
const prompt = require('prompt-sync')();
const apiKey = process.env.apiKey1

let requestURL="https://api.openai.com/v1/responses"
let question= prompt("Hello what do you want?:")
async function gptAPI(gptdata){
    let options={
        method:"POST",
        headers:{
        Authorization:"Bearer "+apiKey,
        "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-5.1",
            input:question
        })
    }
    let response= await fetch(requestURL, options)
    let data= await response.json()
    // console.log(data)
    console.log(data.output[0].content[0].text)
}

gptAPI({
    model:"gpt-5.1",
    input:question
})
// run your code with node chatgpt.js
// add your apiKey to .env from gChat
// Follow the checklist on the Performance Assessment Google Doc
