# Unnamed rhythm game

## Stepmania-ish game

The player tries to hit arrow keys on their keyboard in sync with arrows falling from the top of the screen as they hit the bottom of the screen. Points are gained by hitting the right key at the right time. There may or may not be a time limit.


## MVP (DOM - CANVAS)
	- Arrows (boxes to begin with) fall on their assigned "lanes" from screen top to bottom.
	- Player has to hit the corresponding key when the arrow falls to the bottom (to a set y-value).
	- Player gets points for hitting the  correct key at the right time.
	- Game lasts for a set time, "song length". Game ends when time runs out.
    - Gain pts for correct key (maybe lose pts for wrong key)


## Backlog
- instructions

- Actually synced with music.
-> This means hard-coded strikes.

- if this is impossible, change the design to be a reaction game.
-> the blocks start falling faster after set intervals

- visual effects on arrow-boxes (hilight if key stroke in sync etc)


## Data structure
	1. index.html
	2. main.js
	3. game.js
    4. arrow.js

### 1. index.html

### 2. main.js
buildDom

createSplashScreen

createGameScreen

createGameover

removeScreen

window eventListener start on load

### 3. game.js
#### properties:
ctx
canvas
gameScreen
"arrow-goals" that should align with falling arrows
score
timer

#### methods:
eventListener for key presses -> highlight pressed key
check if collision (between arrow and arrow-goal)
check if correct key press
check if key press was within acceptable accuracy
update score
update positions
loop to remove old + draw new frame
check if time is up

### 4. arrow.js
#### properties:
canvas
ctx
size
arrowType (up, down, left, right)
image
position x (depends on arrowType)
position y
speed

#### methods:
update position
draw image
amIonScreen

## States and State Transitions

SplashScreen
   - Display splash screen
   - Start game when start is pressed

GameScreen
   - game runs while timer has not run out
   - when timer = 0, go to game over screen

Gameover // sos how to make indentation work with md?
   - diplay player points
   - display high scores
   - if restart button is pressed, go to game screen


## Task
- git + github
- html boilerplate
- connect all files
- buildDom
- create screens in main
- make screen transitions in main // this is now done!

### these remain:
- create game constructor
- make the game loop
- arrow constructor
- create moving arrows inside game loop
- check arrow collision on arrow-boxes
- make keyListeners
- change arrow-box style if key was pressed
- check if arrow hitting arrow-box + key press were in sync
- score
- timer
- dislay result in gameover
- add images
- add other visual styles
- scoreboard


## Links


### Trello
[trello](https://trello.com/b/UGy7IOLt/m1-project-game#)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com) uhh
[Link Deploy](http://github.com) erm


### Slides
URls for the project presentation (slides)

