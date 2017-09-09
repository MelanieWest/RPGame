$(document).ready(function(){

var char=[];
var charDiv;
var charIndex;
var charName;
var name;
var hp;
var charImg;


    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200);
  

for (var i=0; i<char.length; i++){
    
    charCardCreate(i,"white","black");

    var boxNum = "#box0" + i;

    $(boxNum).append(charDiv);  //add to back

}
    

$(".char").on("click",function(){

        charIndex = $(this).val();
 
        //$("this").clone().appendTo("#box20");
        // console.log($(this).val());
        // console.log(charIndex); 
        // console.log("hello");


        // console.log($(this).val());
        // console.log(charIndex); 
    
        // var boxToEmpty = "#box0" + charIndex;
        // $(boxToEmpty).remove();
    
        // charDiv = charCardCreate(charIndex,"red","green");
        // $("#box10").append(charDiv);   
        // charDiv = charCardCreate(charIndex,"black","white");
        // $("#box20").append(charDiv); 
   
        for (var i=0; i<char.length; i++){
         
        if (i != charIndex){

            var boxToEmpty = "#box0" + i;
            $(boxToEmpty).remove();

            charDiv = charCardCreate(i,"red","green");
            var boxNum = "#box1" + i;          
            $(boxNum).append(charDiv);   
        } //end of if
        
        } //end of for
        
    
    })
   


//object constructor function

function charConstructor(name,url,hp) {
    this.name = name;
    this.url  = url;
    this.hp   = hp;
}


function charCardCreate(index,backColor,textColor){
    charDiv = $('<div class="icons" background-color = ' + backColor + '>');  //new div for images
    
        charName = $("<p color=" + textColor+ ">");
        hp   = $("<p color = " + textColor+ ">");
            
        charImg = $('<img>');

        charName.html(char[index].name);
        charName.css('color',textColor)
        charImg.attr("src",char[index].url);
        charImg.attr("class","char");
        charImg.attr("width","128px");
        charImg.val(index);

        console.log(charImg.attr("class"));
        console.log(charImg.val());

        hp.html(char[index].hp);
        hp.css('color',textColor);

        charDiv.append(charName);
        charDiv.css('background-color',backColor);
        charDiv.append(charImg);  //put into dynamically created div
        charDiv.append(hp);

        return charDiv;
 
}



})
  