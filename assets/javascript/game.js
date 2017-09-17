$(document).ready(function(){
var char=[], charDiv=[], defenders =[];
var charIndex = -1, defIndex;
var charIndex1, charIndex2, charIndex3, charIndexDef,charIndexLast;
var charName, charImg;
var name,hp,ap,rp;
var boxNum, boxToEmpty;
var ahealth, dhealth, attackerHealth, defenderHealth, attackPower, counterAttackPower;
var attack, attackCount, wins, losses, victories;
var posTop, posLeft; 


    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100,8,10);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120,15,9);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150,7,15);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200,6,12);
  
//initialize cards (stage = 0)

$(".attack").hide();
$(".next").hide();
$("#newbattle").hide();
$("#left").hide();

wins      = 0;
losses    = 0;
victories = 0;

initialize();

$("#start").on("click",function(){
    $("#left").show();
    $("#start").hide(); 
});
    
var stage = 0;  //initialize 'stage' of character selection process

//stage 1 is choose my character;  stage 2 is choose first defender
// in stage 3 second defender is chosen (last def is who's left)

$(".char").on("click",function(){

    charIndex = $(this).val();
    console.log('Index of clicked character is ' + charIndex);

    stage++;
    console.log(stage);

    if (stage == 1){        // in stage 1 original attacker is chosen (index = charIndex1)
        charIndex1 = charIndex;

        // set up stats for attacker here, when he is first chosen.  These won't reset
        // until a new attacker is chosen

        attack = char[charIndex1].ap;       //base attack power - increases each time
        aHealth = char[charIndex1].hp;   // I chose to initialize these in here        
        attackerHealth = aHealth;
        attackPower = attack;

      for (var i=0; i<char.length; i++){
         
        if (i != charIndex1){       //using 'detach' and 'appendTo' preserves attributes of divs
            
            defenders.push(i);      //create an array of defenders (not yet used...)

            // remove defenders from row '0' and store' them in row '2' for duration of game 
            // (staged background is red)

            charDiv[i] = charDiv[i].detach();
             boxNum = "#box2" + i;          
             charDiv[i].appendTo(boxNum);
             charDiv[i].css('background-color','red');
             charDiv[i].css('margin','3px');
            $(".box2").show(); 

        } //end of if       
      } //end of for

      console.log(defenders);  //check if indices of defenders is logged

    }   //end of stage 1 
    
    else if (stage == 2){           // in stage 2 defender is chosen (index = charIndexDef)

        charIndexDef = charIndex;   //general defender index

        //use charIndex2 and charIndex3 to track which indices have been 'used'
        //until I get the defender array working there will be lots of if statements here
        // 3 wins = 1 victory;  after a loss or a 'victory' wins will be reset.

        if (wins == 0) {charIndex2 = charIndex;} 
        else if (wins == 1) {charIndex3 = charIndex;} 
        else if (wins == 2) { charIndexLast = charIndex;}


        console.log("index of defender is "+charIndexDef);

     
                $(".box0").show();  //show current attacker
           
                charDiv[charIndexDef] = charDiv[charIndexDef].detach();

                boxNum = "#box1" + charIndexDef;          

                charDiv[charIndexDef].appendTo(boxNum);
                charDiv[charIndexDef].css('background-color','black');
                charDiv[charIndexDef].css('margin','3px');  

                //clear non-chosen players
               
                $(".box2").hide();
                

        charDiv[charIndex1].animate({top:"190px",left:"80px"},2000);
        charDiv[charIndexDef].animate({top:"-20px",left:"350px"},2000);

        $(".attack").show();
        $(".next").hide();      

        //new defender stats initialized

        dHealth = char[charIndexDef].hp;
        defenderHealth = dHealth;
        counterAttackPower = char[charIndexDef].rp;   //this is constant
        
        // initialize stats in display;  only defender stats will change here

        $("#health").html("Health: " + attackerHealth + "  Attack Strength (next): " + attackPower);
        $("#defender").html("Defender health: " + defenderHealth+ " Counterattack: "+ counterAttackPower);         
 
              
    } // end of stage 2 'if' block

    else {      // this block may not be used; it's diagnostic

        console.log("Stage is not 1 or 2");
    }
    
    })


// this intentionally resets characters so new opponents can be chosen

    $("#newbattle").on("click",function(){

        for (var k=0; k<char.length; k++){
            posTop = 0 + 'px';
            posLeft = k*200 + 'px';
            charDiv[k].animate({top: posTop,left: posLeft},2000);
    
            charDiv[k]= charDiv[k].detach();    //remove from wherever they are
            boxNum = "#box0" + k;
            charDiv[k].appendTo(boxNum);
            charDiv[k].css('background-color','yellow');
            charDiv[k].css('margin','3px');  

         }
         wins   = 0;
         stage  = 0;
         attackCount = 0;
         charIndex1 = -1;
         charIndex2 = -1;
 

    })




    $(".attack").on("click",function(){

        attackCount++;    //make sure this doesn't reset until lose or win against all 3              
    
        attackPower = attack*(attackCount);   //attack power this time
 
        attackerHealth -= counterAttackPower;  //calc cum each time
        defenderHealth -= attackPower;

        if(attackerHealth <= 0){
            losses++;
            $(".box2").hide();
            //$(".next").show();
            $("#newbattle").show();   //keep hidden until win or loss occurs

            //reset characters to original position;
            for (var k=0; k<char.length; k++){
                posTop = 0 + 'px';
                posLeft = k*150 + 'px';
                charDiv[k].animate({top: posTop,left: posLeft},2000);
        
                charDiv[k]= charDiv[k].detach();    //remove from wherever they are
                boxNum = "#box0" + k;
                charDiv[k].appendTo(boxNum);
                charDiv[k].css('background-color','yellow');
                charDiv[k].css('margin','3px'); 
                $(".box0" ).show();
    
             }
             wins   = 0;
             stage  = 0;
             attackCount = 0;
             charIndex1 = -1;
             charIndex2 = -1;
                
            //game over; new game
           }
        else if(defenderHealth <=0){
            wins ++;

            //remove current defender
            charDiv[charIndexDef]=charDiv[charIndexDef].detach();                                                   
            
            //$(".next").show();  //next defender button
            $(".box2").show();  //show remaining defenders 

            if (wins == 1){

                $(".box0").hide();  //hide current attacker                
                $(".box2").show();  //show remaining defenders

                //they'll be selected by a .char click event

                for (var i = 0; i<char.length; i++){

                    if (i != charIndex1){
                    charDiv[i].css('background-color','red');
                    charDiv[i].css('margin','3px');  
                    //move them up higher
                    charDiv[i].css('top','-20px');
                    }               
                }                
                stage=1;   //it will increment to stage 2 when a character is clicked     
                
                 
            }
            else if (wins == 2){     //only one defender remains;  select that one

                for (var kk=0; kk<char.length; kk++){

                    if((kk!= charIndex1) &&(kk!= charIndex2)&&(kk!= charIndex3)){
                        charIndexLast = kk;
                    }
                    else if ((kk==charIndex2)||(kk==charIndex3)){
                        charDiv[kk] = charDiv[kk].detach();                        
                    }
                }
                boxNum = "#box1" + charIndexLast;          
                
                    charDiv[charIndexLast].appendTo(boxNum);
                    charDiv[charIndexLast].css('background-color','black');
                    charDiv[charIndexLast].css('margin','3px'); 

                    charDiv[charIndexLast].animate({top:"-20px",left:"350px"},2000);
            
                    $(".attack").show();
                    $(".next").hide();      
            
                    //new defender stats initialized
            
                    dHealth = char[charIndexLast].hp;
                    defenderHealth = dHealth;
                    counterAttackPower = char[charIndexLast].rp;   //this is constant
                    
                    // initialize stats in display;  only defender stats will change here
            
                    $("#health").html("Health: " + attackerHealth + "  Attack Strength (next): " + attackPower);
                    $("#defender").html("Defender health: " + defenderHealth+ " Counterattack: "+ counterAttackPower);         
             
                    //defenderSetup();      //this didn't work
            }
            else if (wins == 3){
                victories ++;   //a victory is when all 3 defenders are conquered
                wins = 0;       //reset wins to 0 to start again
                stage  = 0;
                attackCount = 0;
                charIndex1 = -1;
                charIndex2 = -1;
                $("#newbattle").show();
        
 //               initialize();
            }
            
        }

        attackPower = attack*(attackCount+1);   //attack power next time
        
       $("#health").html("Health: " + attackerHealth + "  Attack Strength (next): " + attackPower);
       $("#defender").html("Defender health: " + defenderHealth+ " Counterattack: "+ counterAttackPower);         
       $("#stats").html("Wins: " + wins + "  Losses: " + losses+ " Victories: "+victories);  
    })



    

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

function initialize(){      // execute on start or reset, as called upon
    
        attackCount = 0;
        stage = 0;
        charIndex1 = -1;
        charIndex2 = -1;
    
        for (var i=0; i<char.length; i++){
    
            charCardCreate(i,"yellow","CornflowerBlue");
            boxNum = "#box0" + i;
            $(boxNum).append(charDiv[i]);
    
        }
};
    




})
  