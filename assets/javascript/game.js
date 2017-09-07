$(document).ready(function(){

var char=[];
var charDiv;

    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200);
     

$(".char").on("click",function(){

    var charIndex = $(this).val();
    console.log(charIndex);

    var boxToEmpty = "#box0" + charIndex;
    $(boxToEmpty).remove();

    charDiv = charCardCreate(charIndex);
    $("#box20").append(charDiv);   
});




for (var i=0; i<char.length; i++){
    
  charCardCreate(i);

   //for now, locate the characters around the board to see if
   // the boxes hold their locations in rows and keep the colors
   //initially they should be put in "#box0"+i (top row).
   //moving them is proving challenging.

  var boxNum = "#box"+ i + i;
  $(boxNum).append(charDiv);  //add to back

  }
    


//object constructor function

function charConstructor(name,url,hp) {
    this.name = name;
    this.url  = url;
    this.hp   = hp;
}


function charCardCreate(index){
    charDiv = $('<div class="icons">');  //new div for images
    
        var name = $("<p>");
        var hp   = $("<p>");
            
        var charImg = $('<img>');

        name.html(char[index].name);
        charImg.attr("src",char[index].url);
        charImg.attr("class","char");
        charImg.attr("width","128px");
        charImg.attr("value",index);
        hp.html(char[index].hp);

        charDiv.append(name);
        charDiv.append(charImg);  //put into dynamically created div
        charDiv.append(hp);

        return charDiv;
 
}

})