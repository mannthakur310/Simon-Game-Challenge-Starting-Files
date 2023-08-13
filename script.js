

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;

var level =0;

$(document).keypress(function(){
    if(!started){
        $('#level-title').text("Level "+ level);
        nextSequence();
        started=true;
    }
});

$('.btn').click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkanswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

function checkanswer(currentlevel){

    if(gamePattern[currentlevel]=== userClickedPattern[currentlevel]){
       console.log("success");
       if(userClickedPattern.length=== gamePattern.length){
           //after 1000ms delay
           setTimeout(function() {
               nextSequence();
           },1000);
           
       }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');

        setTimeout(function(){
        $('body').removeClass('game-over')
        },200); 

       
        startover();
    }
   }
    


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber=Math.floor(Math.random()*4);
    var chosenRandomColour=buttonColours[randomNumber];
    gamePattern.push(chosenRandomColour);

    $("#"+ chosenRandomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenRandomColour);
    
};

function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);

}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}




