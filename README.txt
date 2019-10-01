This is a program created for CPSC 353, Fall 2019
Project #1: cellular automata ant #12

"Ant-Main.html" and "ant.js" programmed by Jarod Lewins, contact email jarodlewins@gmail.com

This is a program to simulate a simple cellular automata, that will turn right on magenta and black, and left on yellow and cyan.
when the ant leaves a tile, it iterates that tile in the grid to the next color in the sequence black -> magenta -> yellow -> cyan -> black...
This ant will iterate 1000 times, before it comes to a rest. This can be adjusted via the file labeled "Ant-Main.html".
This file contains the HTML needed to setup the page, as well as a small portion of javascript that is needed to invoke the ant methods

A majority of the javascript code is contained within the file "ant.js".
This file contains an Ant class that keeps track of various aspects of the ant's behavior.
in addition, methods are outlined that allow the ant to turn, iterate the color it is on, and set it's orientation (North, South, East, West)

A simple CSS file is used to style the canvas. This file was untouched from the file that was provided by Professor Ciska.

This project contains the following files:
"Ant-Main.html"
"ant.js"
"styles.css"

To run the ant, simply open the file "Ant-Main.html" in any browser.
