$(document).ready(function(){

var char=[];
var charDiv;
var charIndex;
var charIndex1;
var charIndex2;
var charName;
var name;
var hp;
var charImg;
var stage = 0;
var boxToEmpty;
var boxNum;


    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200);
  
//initialize cards (stage = 0)

for (var i=0; i<char.length; i++){

    charCardCreate(i,"white","black");

    boxNum = "#box0" + i;

    $(boxNum).append(charDiv);  //add to back

}
 //once I move them to the staging area, the characters aren't recognized as characters...(class = char) 
 // at first creation, they are recoginzed with classes 'char' and 'icons'.  After they are moved,
 // they are only recognize with class 'box1' (the class of the div into which they're appended) 
 
 // can I get them out of a click function?  They are being virtually created by the same function
 // that created them to begin with.  They are showing up.  Why are attributes changing?

$(".char").on("click",function(){

    charIndex = $(this).val();
    console.log(charIndex)
    stage++;
    console.log(stage);

    if (stage == 1){        // in stage 1 original attacker is chosen (index = charIndex1)
        charIndex1 = charIndex;
      for (var i=0; i<char.length; i++){
         
        if (i != charIndex1){

            boxToEmpty = "#box0" + i;
            $(boxToEmpty).remove();

            charDiv = charCardCreate(i,"red","green");
            boxNum = "#box1" + i;          
            $(boxNum).append(charDiv); 

        } //end of if
        
      } //end of for
    }   //end of stage 1 
    
    else if (stage == 2){           // in stage 2 defender is chosen (index = charIndex2)

        charIndex2 = charIndex;

        console.log(charIndex2)        
   
        for (var j=0; j<char.length; j++){
             
            if ((j != charIndex1)&&(j != charIndex2)) {
    
                boxToEmpty = "#box1" + j;
                $(boxToEmpty).remove();
      
            } //end of if that clears non-chosen players

            else if (j == charIndex2){

                charDiv = charCardCreate(j,"black","white");
                boxNum = "#box2" + j;          
                $(boxNum).append(charDiv); 

            }  // end of else that stages defender
            
        } //end of for
    } // end of stage 2 if
    else {
        console.log("Stage is not 1 or 2");
    }
    
    })

    $(".box1").on("click",function(){
        console.log("recognized as box1");
    })

    $(".icons").on("click",function(){
        console.log("recognized as icons");
    })

    $(".char").on("click",function(){
        console.log("recognized as char");
    })
  
    

//object constructor function

function charConstructor(name,url,hp) {
    this.name = name;
    this.url  = url;
    this.hp   = hp;
}


function charCardCreate(index,backColor,textColor){
    charDiv = $('<div class="icons" >');  //new div for images
    
        charName = $("<p>");
        hp   = $("<p>");
            
        charImg = $('<img>');

        charName.html(char[index].name);
        charName.css('color',textColor);
        charImg.attr("src",char[index].url);
        charImg.attr("class","char");
        charImg.attr("width","128px");
        charImg.val(index);

        console.log(charImg.attr("class"));
        console.log(charImg.val());

        hp.html(char[index].hp);
        hp.css('color',textColor);

        charDiv.append(charName);        
        charDiv.append(charImg);  //put into dynamically created div
        charDiv.append(hp);
        charDiv.css('background-color',backColor);
        charDiv.css('margin','3px');
        

        return charDiv;
 
}



})
  