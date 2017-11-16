# RPGame

https://melaniewest.github.io/RPGame/

This is a Role-Playing game with a Looney-Tunes theme.

The game is implemented using html, css, javascript and jQuery.

When the game begins there is a mostly-empty screen with one option:
Press the `danger ACME explosives` button.

Once this is pressed, the four available characters are shown, with
 their health points displayed.  They also each have a given amount of
 attack power.  

The first character you click on will become your champion for the round. When the champion
is selected, the rest of the characters will be staged in the 'defenders' area, and your champion will have to 
face all of them, one at a time.  You click on one to select who will be first.

Once you choose a defender, the other players will be temporarily hidden from view.
Your first attack will cause your opponent to lose health in an amount equal to your attack
points.  Your attack points increase to the next multiple of your original attack points every time
you attack.

Your health points will also decrease by your opponents' attack points with every attack, but their
attack points will not change.

You achieve a 'win' if you survive one opponent (health points don't go below zero).  You achieve
a 'victory' if you survive all three opponents.  If you achieve a 'victory', then you can choose a 
new champion and the game starts over.

