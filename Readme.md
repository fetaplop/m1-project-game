# Unnamed rhythm game

## Stepmania-ish game

The player tries to hit arrow keys on their keyboard in sync with arrows falling from the top of the screen as they hit the bottom of the screen. Points are gained by hitting the right key at the right time. There may or may not be a time limit.

## Classes

### There will be a class describing the game and a class describing the arrows.



# Project's name

## Description
Brief description of the project


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

-if this is impossible, change the design to be a reaction game.
-> the blocks start falling faster after set intervals


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

### 4. arrow.js


## States and State Transitions

- SplashScreen
    Display splash screen
    Start game when start is pressed
- GameScreen
    game runs while timer has not run out
    when timer = 0, go to game over screen
- Gameover
    diplay player points
    display high scores
    if restart button is pressed, go to game screen


## Task
Task definition in order of priority


## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)


