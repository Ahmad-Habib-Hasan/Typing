window.addEventListener("load" ,numbers)


let input1 = document.getElementById("input1");
const time1 = document.querySelector("#time");
const right = document.querySelector("#right");
const fast = document.querySelector("#fast")
const displaycharacters = document.getElementById("dispaycharacters");

let texts = "";

let trueAnswer = 0 ;
let characterSpan;
let time2 = 0 ;
let time3 = 0 ;
let wordText = 0 ;
let lenghtOfArray;

let keySound;
let startingTime;
let changeColor;
let finishText;
let darkMode = false ;


let wrongLetter = 0;
let rightLetter = 0;
let rightInput = 0;
let wrongInput = 0;
let acc = 0 ;
let wmp =0 ;

let saveRight = 0;
let saveWrong = 0 ;
let secondRight= 0 ;
let secondWrong= 0 ;

const words = [
    "right",
    "hello",
    "parachute",
    "suburb",
    "method",
    "cover",
    "praise",
    "pace",
    "beard",
    "shadow",
    "boat",
    "weight",
    "gloom",
    "invisible",
    "book",
    "hole",
    "tight",
    "pill",
    "photography",
    "civilization",
    "flight",
    "shiver",
    "teach",
    "cluster",
    "throat",
    "glue",
    "surprise",
    "concrete",
    "council",
    "trouser",
    "survivor",
    "excuse" ,
    "are" , 
    "is" ,
    "and" , 
    "for"
];



input1.addEventListener("keypress" , enterPress );




function timeOut(){
        clearInterval(finishText, changeColor , startingTime);

        alert("accuracy: " + Math.round(acc)+"%\n" +
        "Time :"+ time3 + "s\n"+
        "wmp " +Math.round(wmp));
        numbers(); 

        acc= 0 ;
        wmp = 0;
        saveRight = 0;
        saveWrong = 0 ;
        secondRight= 0 ;
        secondWrong= 0 ;
        newSentence = 0 ;
        input1.value = "";
        time2= 0 ;
        time3 = 0 ;
   
}

function game(){
   
    if(time2 > 0){       
   changeColor = setInterval(changingColor ,100);  
    }
    
    finishText =setInterval(finishedText, 100)
   

}
function finishedText(){
    acc = (saveRight)/input1.value.length*100;
    wmp = (((saveRight)/5)/time3)*60 ;
    rightLetter = saveRight ;
    console.log(rightInput);

    if(acc>0 && acc<=100){
    right.innerHTML =Math.round( acc) ;
    }

    fast.innerHTML = Math.round(wmp) ;
    
    

    if(input1.value.length == texts.length){
        
        clearInterval(startingTime , changeColor ,finishText);        
        alert("accuracy: " + Math.round(acc)+"%\n" +
        "Time :"+ time3 + "s\n"+
        "wmp " +Math.round(wmp));
numbers();
    }

}


function numbers(){

            texts = "";
     let twiceWord2 = "";



        for(let i = 0 ; i<25 ; i+=1){
            const number = Math.floor(Math.random()*words.length);
            let twiceWord = words[number];

            if(twiceWord == twiceWord2){
                i--;
            }else{
            if(i<24){
            texts += words[number] + " ";         
            }else{
                texts += words[number];           
            }

            }
          twiceWord2 = words[number];
        
    }


    input1.value = "";
     displaycharacters.innerHTML = "";   
    texts.split('').forEach(character => {
        characterSpan = document.createElement('span');
        characterSpan.innerText = character ;
        displaycharacters.appendChild(characterSpan);
    });

    
}
function changingColor(){
    // to save wrong inputs and right inputs .
    if( secondWrong<wrongInput)
        saveWrong += 1;

    if(secondRight<rightInput)
    saveRight = rightInput - saveWrong;



    secondWrong = wrongInput;
    secondRight = rightInput;
    
    wrongInput = 0 ;
    rightInput = 0 ;

    
    const arrayText = displaycharacters.querySelectorAll('span');
    const arrayInput = input1.value.split('');
    arrayText.forEach((characterSpan , index) =>{
        const character = arrayInput[index];
        if(character == null){

            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');

        }else if(character == characterSpan.innerHTML){

            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            rightInput +=1 ;

        }else{

            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            wrongInput +=1 ;

        }



    });  




}

function enterPress(key){
    let keyPressed = 0 ;

    if(key.keyCode == "13"){
        keyPressed +=1;

    if(keyPressed>0){
        clearInterval(startingTime , changeColor , finishText);
    }

        changeToZero();
        game();
        startingTime =  setInterval(time , 1000) ;
    }

}

function time(){

    if(time2 == 0){
        time1.innerHTML = time2;
        timeOut();
        time2--;
    }

    if(time2 > 0){
        time2--;
        time3++;


        time1.innerHTML = time2;
    }



}

function changeToZero(){
    wmp = 0;
    saveRight = 0;
    saveWrong = 0 ;
    secondRight= 0 ;
    secondWrong= 0 ;
    rightInput = 0;
    wrongInput = 0;
    acc = 0 ;
    time2 =30;

    input1.value = "";
}

// darkMode
$(".darkMode").on("click",function(){
    if($(this).html() == "off"){
        darkMode1();
    $(this).html("on");
    }else{
        $(this).html("off");
        whiteMode1();
    }
});
function darkMode1(){
    $("body").css("background-color" , "#292929");
    $("#box").css("background-color" , "#363a3b");
    $("#box2").css("background-color" , "#363a3b");    
    $("footer").css("background-color" ,"#3f4446" );
    $("body").css("color" , "#929292");


}
function whiteMode1(){
    $("body").css("background-color" , "#222831");
    $("#box").css("background-color" , "#393E46");
    $("#box2").css("background-color" , "#393E46");    
    $("footer").css("background-color" ,"rgba(0, 0, 0 , 0.4)" );
    $("body").css("color" , "#EEEEEE");

}
//Sound
$(".Sound").on("click" , function(){
    if($(this).html() == "off"){
        $(this).html("on");
                     
        input1.addEventListener("keypress" , sound);
    }else{
        $(this).html("off");
        input1.removeEventListener("keypress" , sound)
               
    }
})
function sound(){
    keySound = new Audio('keyboardSound.mp3');
    keySound.play();
}