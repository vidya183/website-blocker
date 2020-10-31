let input = document.querySelector(".block")
var timer = document.querySelector(".timer")
let ul = document.querySelector("ul")
let button = document.querySelector(".btn")

button.addEventListener("click", async function(){
    let toBeBlocked = input.value;//url
    if(toBeBlocked){
        let time = timer.value
        await sendMessage({type:"send", link: toBeBlocked, time})
        //console.log(time)
        addToList(toBeBlocked, timer)
    }
})

async function init(){
    let blocklist = await sendMessage({type:"getList", link: undefined})
    for(let i=0; i<blocklist.length; i++){
        addToList(blocklist[i].site, blocklist[i].time)
    }
}

init()

function addToList(toBeBlocked, time){
    let li = document.createElement("li")
    li.setAttribute("class", "list-group-item")
    li.innerHTML = toBeBlocked + '<i class="fas fa-times"></i>'
    ul.appendChild(li)
    input.value = ''
    timer.value = ''
    let i = li.querySelector("i")
    i.addEventListener("click", async function(){
        let site = i.parentNode.textContent
        await sendMessage({type:"remove", link: site})
        i.parentNode.remove()
    })
}

function sendMessage(message){
    return new Promise(function(resolve, reject){
        chrome.runtime.sendMessage(message, function(response){
            resolve(response)
        })
    })
}