const env = require('dotenv').config({ quiet: true });
const prompt = require('prompt-sync')();
const apiKey = process.env.apiKey1

let requestURL="https://api.openai.com/v1/responses"
let question= prompt("ChatGPT:\nHello! Welcome to the chatbot project. This bot was built to answer a single prompt and upgraded with extra credit so it can hold full conversations. What would you like to ask?\n\nUser:")
let id;
let message;
let converse;
async function gptAPI(gptdata){
    let options={
        method:"POST",
        headers:{
        Authorization:"Bearer "+apiKey,
        "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-5.1",
            input:question,
            instructions:"Respond ONLY in plain text. Do NOT use markdown, bullets, bold, italics, or special characters."
        })
    }
    let response= await fetch(requestURL, options)
    let data= await response.json()
    
    message=data.output[0].content[0].text
     id= data.id
}




async function conversation(gptdata){
    let nQuestion;
    converse=prompt("\nDo you want to end to convo(y/n)")
    if(converse=="y"){
        console.log("\nChatGPT:\n"+message)
        nQuestion=""
    }  
    else{
        nQuestion=prompt("\nChatGPT:\n"+message+"\n\nUser:")
    }
let options={
        method:"POST",
        headers:{
        Authorization:"Bearer "+apiKey,
        "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-5.1",
            input: nQuestion,
            previous_response_id:id,
            instructions:"Respond ONLY in plain text. Do NOT use markdown, bullets, bold, italics, or special characters."

        })
    }
    let response= await fetch(requestURL, options)
    let data= await response.json()
// console.log(data)
 message=data.output[0].content[0].text
    id=data.id

}



async function run(){
    await  gptAPI({
    model:"gpt-5.1",
    input:question
    
})
while(converse!="y"){
  
 await  conversation({
    model:"gpt-5.1",
   previous_response_id:id


})

}

}

run()

// run your code with node chatgpt.js
// add your apiKey to .env from gChat
// Follow the checklist on the Performance Assessment Google Doc
