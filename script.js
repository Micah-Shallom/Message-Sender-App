const count=document.getElementById('count');
const total=document.getElementById('total');
const messageInput=document.getElementById('message-input');
const sendbtn=document.getElementById('sendbtn');
const errormessage=document.getElementById('errorMsg');
const loaderGroup=document.getElementById('loaderGroup');
const openModal=document.querySelector('.openModal');
const modalContainer=document.querySelector('.message-log-container');
const closeModal=document.getElementById('closeModal');
const messageBox=document.getElementById('message-box');
const showSent=document.getElementById('showSent');
const messages=[];



// GlobalTimer
function showTime(){
    let date=new Date();
    let hours=date.getHours();
    let mins=date.getMinutes();
    let secs=date.getSeconds();
    ((hours)<10)?hours='0'+hours:hours;
    (mins<10)?mins='0'+mins:mins;
    (secs<10)?secs='0'+secs:secs;
    let output=`${hours}:${mins}:${secs}`;
    document.getElementById('timer').innerHTML=output;
}

setInterval(()=>{
   showTime()
},1000);


    

// Open modal
openModal.addEventListener('click',()=> modalContainer.classList.add('show-modal'));

// close modal
closeModal.addEventListener('click',() => modalContainer.classList.remove('show-modal'));

// toggle message visibility
document.getElementById('message-check').addEventListener('click',()=>(messageInput.type=='text')?messageInput.type='password':messageInput.type='text');

sendbtn.addEventListener('click',()=>{
    if(messageInput.value==''){
        errormessage.textContent='No Message Entered';
        errormessage.classList.add('show-error');
    }else{
        setTimeout(show,3000);
        loaderGroup.classList.add('show-loader');
        errormessage.classList.remove('show-error');
    }
})

const show=()=>{

    let text=messageInput.value;
    messageBox.innerHTML=text;
    text='';
    loaderGroup.classList.remove('show-loader');
    // show message sent popup after loader timeout is reached
    showSent.classList.add('show');

    // timeout to remove message popup after 3seconds
    setTimeout(removeMsg,3000);
    
    // function to update count and message pricing
    
    updateMessageCount();

}

//Remove message popup when timeout is reached
const removeMsg=()=>{
    showSent.classList.remove('show')
}

const updateMessageCount=()=>{
    // save all message entries into an array
    messages.push(messageInput.value);
    count.innerHTML=messages.length;
    total.innerText=messages.length*5;
    
    localStorage.setItem('savedMessages',JSON.stringify(messages));
    
    logMessagesToModal();
}

const logMessagesToModal=()=>{
    let date=new Date();
    let hours=date.getHours();
    let mins=date.getMinutes();
    let secs=date.getSeconds();
    ((hours)<10)?hours='0'+hours:hours;
    (mins<10)?mins='0'+mins:mins;
    (secs<10)?secs='0'+secs:secs;
    let output=`${hours}:${mins}:${secs}`;
    
    // creating new p tags and appending them to message log as history
    let para=document.createElement('p');
    let time=document.createElement('span');
    time.innerHTML=`Time: ${output}`;
    para.appendChild(time);

    let message=messages[messages.length-1];
    para.textContent=message.split('')[0].toUpperCase()+message.slice(1);
    document.getElementById('message-log').appendChild(para);
    document.getElementById('message-log').appendChild(time);
    
}

// Checking for length of characters
messageInput.addEventListener('input',()=>{
    if((messageInput.value).match(/\s/g).length>10){
        errormessage.classList.add('show-error');
        sendbtn.disabled=true;
    }else{
        errormessage.classList.remove('show-error')
        sendbtn.disabled=false;

    }
})

// populatingUI with message data from localstorage coming soon
// function populateUI(){
//     const savedMessages=JSON.parse(localStorage.getItem('savedMessages'));
//     count.innerText=savedMessages.length;
//     total.innerText=savedMessages.length*5;
//     messageBox.innerText=savedMessages[savedMessages.length-1];
//     showSent.classList.add('show');
//     showSent.innerText=`${savedMessages.length} was sent before refresh`
    
// }

// populateUI();

//Enabling Welcome Page Typewriter Effect
const welcomePageTitles=document.querySelector('.welcomePageTitle');
let welcomePageTitle=`Welcome to my Message Sender App `;
welcomePageTitleArr=welcomePageTitle.split(' ').join('.');
let textSpeed=300,i=0;


const typingEffect=()=>{
    if(i<welcomePageTitleArr.length){
        welcomePageTitles.innerText+=`${welcomePageTitleArr[i]}`
        i++;
        setTimeout(typingEffect,textSpeed);
    }
}

document.body.onload=function (){
    typingEffect();
    setTimeout(removeMsgs,20000);
}

const removeMsgs=()=>{
    document.querySelector('.welcomePage').classList.add('show');
}


    
 