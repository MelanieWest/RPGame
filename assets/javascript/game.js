$(document).ready(function(){
var char=[], charDiv=[], defenders =[];
var charIndex = -1, defIndex;
var charIndex1, charIndex2;
var charName, charImg;
var name,hp,ap,rp;
var stage = 0;
var boxNum, boxToEmpty;
var ahealth, dhealth, attackerHealth, defenderHealth, attackPower, counterAttackPower;
var attack, attackCount, wins, losses;


    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100,8,10);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120,15,9);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150,7,20);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200,6,25);
  
//initialize cards (stage = 0)

$(".attack").hide();
$(".next").hide();
$("#newbattle").hide();
$("#left").hide();

initialize();

$("#start").on("click",function(){
    $("#left").show();
    $("#start").hide();
});
    


 
$(".char").on("click",function(){

    charIndex = $(this).val();
    console.log(charIndex);


    stage++;
    console.log(stage);

    if (stage == 1){        // in stage 1 original attacker is chosen (index = charIndex1)
        charIndex1 = charIndex;
      for (var i=0; i<char.length; i++){
         
        if (i != charIndex1){       //using 'detach' and 'appendTo' preserves attributes of divs
            
            defenders.push(i);      //create an array of defenders (not yet used...)

            charDiv[i] = charDiv[i].detach();
             boxNum = "#box1" + i;          
             charDiv[i].appendTo(boxNum);
             charDiv[i].css('background-color','red');
             charDiv[i].css('margin','3px');
      

        } //end of if       
      } //end of for

      console.log(defenders);  //check if indices of defenders is logged

    }   //end of stage 1 
    
    else if (stage == 2){           // in stage 2 defender is chosen (index = charIndex2)

        charIndex2 = charIndex;

        defIndex=defenders.indexOf(charIndex2);  //where in the array is this index found?

        console.log("defender chosen was at index "+defIndex);// getting -1 right now

        defenders.splice(defIndex, 1);      //try to modify defenders array for next cycle (not yet used)

        console.log('remaining defender indices: ' + defenders); //not working
        console.log("defender chosen: " + char[charIndex2].name);   //is working
   
        for (var j=0; j<char.length; j++){  // remove non-chosen players from display
             
            if ((j != charIndex1)&&(j != charIndex2)) {
    
                charDiv[j] = charDiv[j].detach();
      
            } //end of if that clears non-chosen players

            else if (j == charIndex2){      //display defender in black

                boxNum = "#box2" + j;          

                charDiv[j].appendTo(boxNum);
                charDiv[j].css('background-color','black');
                charDiv[j].css('margin','3px');    

            }  // end of else that stages defender
            
        } //end of for

        charDiv[charIndex1].animate({top:"190px",left:"80px"},2000);
        charDiv[charIndex2].animate({top:"-20px",left:"350px"},2000);

        $(".attack").show();
              
    } // end of stage 2 'if' block

    else {      // this block may not be used; it's diagnostic

        console.log("Stage is not 1 or 2");
    }
    
    })


// this intentionally resets characters so new opponents can be chosen
    $("#newbattle").on("click",function(){
        for (var k=0; k<char.length; k++){
            charDiv[k]= charDiv[k].detach();    //remove from wherever they are
            boxNum = "#box0" + k;
            $(boxNum).append(charDiv[k]);  //add to first row
         }
    })




    $(".attack").on("click",function(){
        attackCount++;    //make sure this doesn't reset until lose or win against all 3              

        attack = char[charIndex1].ap;       //base attack power - increases each time
        counterAttackPower = char[charIndex2].rp;   //this is constant

        aHealth = char[charIndex1].hp;   // I chose to initialize these in here
        dHealth = char[charIndex2].hp;   
    
        attackPower = attack*attackCount;   //attack power this time

       // attackerHealth -= counterAttackPower   //update health if init outside click event
       // defenderHealth -=  attackPower          //update health if init outside click event

        attackerHealth = aHealth -  attackCount * counterAttackPower;  //calc cum each time
        defenderHealth = dHealth - (attackCount)*((1+attackCount)/2)*attack;

        if(attackerHealth <= 0){
            losses++;
            $(".box2").hide();
            //$(".next").show();
            $("#newbattle").show();   //keep hidden until win or loss occurs

            
            //game over; new game
           }
        else if(defenderHealth <=0){
            wins ++;
            $(".box2").hide();
            $(".next").show();  //next defender          
            
        }

       $("#health").html("Health: " + attackerHealth + "  Attack Strength: " + attackPower);
       $("#defender").html("Defender health: " + defenderHealth+ " Counterattack: "+ counterAttackPower);         
       $("#stats").html("Wins: " + wins + "  Losses: " + losses);  
    })

$(".next").on("click",function(){ // only allow this option in the case of a win (show )

    for (var i =0; i<char.length; i++){ // go thru all characters, though 2 have been selected out

        //bring up next 2 available defenders
        // this would be a good time to used "defenders" array (not tested yet)
        // ('defenders' array holds indices of characters not yet selected in an array)

        if (i == charIndex2){       //remove defender (not visible) from div
            boxNum = "#box2" + i;          
            charDiv[i]=charDiv[i].detach();                          
        }

        if ((i != charIndex1)&&(i != charIndex2)) { //find remaining 2 and display for selection

           // charDiv[i] = charDiv[i].detach();
            boxNum = "#box1" + i;         

            charDiv[i].appendTo(boxNum);
            charDiv[i].css('background-color','red');
            charDiv[i].css('margin','3px');  
            
            //move them up higher
            charDiv[i].css('top','-20px');

        } //end of if that displays remaining defender candidates

        stage = 1;      //next character click sets up battle
    }
})




    // $(".icons").on("click",function(){
    //     console.log("recognized as icons");
    // })

    // $(".char").on("click",function(){
    //     console.log("recognized as char");
    // })
  
    

//object constructor function

function charConstructor(name,url,hp,ap,rp) {
    this.name = name;       //character name for display
    this.url  = url;        //character icon for display
    this.hp   = hp;         //character health points at start
    this.ap   = ap;         //character attack points at start
    this.rp   = rp;         //character response or counterattack
}


function charCardCreate(index,backColor,textColor){
    charDiv[index] = $('<div class="icons" >');  //new div for images
    charDiv[index].css('position','relative');
    
        charName = $("<p class='name'>");
        hp   = $("<p class = 'hp' >");
            
        charImg = $('<img>');

        charName.html(char[index].name);
        charName.css('color',textColor);
        charName.css('text-shadow','1px 1px #AAA')
        charImg.attr("src",char[index].url);
        charImg.attr("class","char");
        charImg.attr("width","128px");
        charImg.val(index);

        console.log(charImg.attr("class"));
        console.log(charImg.val());

        hp.html(char[index].hp);
        hp.css('color',textColor);
        hp.css('text-shadow','1px 1px #AAA')
        
        charDiv[index].append(charName);        
        charDiv[index].append(charImg);  //put into dynamically created div
        charDiv[index].append(hp);
        charDiv[index].css('background-color',backColor);
        charDiv[index].css('margin','3px');
        

        return charDiv[index];
 
}

function initialize(){      // execute on start
    
        wins = 0;
        losses = 0;
        attackCount = 0;
    
        for (var i=0; i<char.length; i++){
    
            charCardCreate(i,"yellow","CornflowerBlue");
            boxNum = "#box0" + i;
            $(boxNum).append(charDiv[i]);
    
        }
};
    


})
  