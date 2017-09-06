$(document).ready(function(){

var char=[];

    char[0] = new charConstructor('Bugs Bunny',"assets/images/bugsicon.jpg",100);
    char[1] = new charConstructor('Road Runner',"assets/images/rricon.png",120);
    char[2] = new charConstructor('Wile E. Coyote',"assets/images/wileicon.png",150);
    char[3] = new charConstructor('Yosemite Sam',"assets/images/samicon.png",200);
     

// $("#box21").html("ready");

// $(".box1").on("click",function(){
//     $(this).appendTo("#box31");
// });




for (var i=0; i<char.length; i++){
    
                var charDiv = $('<div class="icons">');  //new div for images
    
                var name = $("<p>");
                var hp   = $("<p>");
                  
                var charImg = $('<img>');

                name.html(char[i].name);
                charImg.attr("src",char[i].url);
                hp.html(char[i].hp);

                charDiv.append(name);
                charDiv.append(charImg);  //put into dynamically created div
                charDiv.append(hp);
    
                var boxNum = "#box3" + i;
                $(boxNum).append(charDiv);  //add to back
                }
    



function charConstructor(name,url,hp) {
    this.name = name;
    this.url  = url;
    this.hp   = hp;
}

})