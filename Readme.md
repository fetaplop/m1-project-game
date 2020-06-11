# Unnamed rhythm game

## Stepmania-ish game

The player tries to hit arrow keys on their keyboard in sync with arrows falling from the top of the screen as they hit the bottom of the screen. Points are gained by hitting the right key at the right time. There is a time limit. Play the game [here!](https://fetaplop.github.io/m1-project-game/)


## MVP / Main Features
- Arrows (boxes to begin with) fall on their assigned "lanes" from screen top to bottom.
- Player has to hit the corresponding key when the arrow falls to the bottom to a set hit area represented by a box.
- Player gains points for hitting the correct key when it is aligned with its corresponding box. (Player loses pts for incorrect key)
- Game lasts for a set time, "song length". Game ends when time runs out.


## Backlog
- leaderboards!
- disable the possibility to get double points by hitting twice in fast succession (solved)
- change difficulty (hard mode already implemented)
- reverse mode! hit the opposite key !
- instructions on how to play
- Actually synced with music.
  - This means hard-coded strikes..
- -> if this is impossible, change the design to be a reaction game only
  - the blocks start falling faster after set intervals
- visual effects on arrow-boxes (hilight if key stroke in sync etc)


## Data structure
1. index.html
2. main.js
3. game.js
4. arrow.js

### 1. index.html
Initialise html page and call scripts that run the game.

### 2. main.js
Switch between different states (splash screen, game screen, game over etc.) and create HTML elements.

### 3. game.js
Holds the class ```Game``` with all the game properties like score, canvas, timer etc. The method ```start(mode)``` initialises a new game with event listeners and takes the game mode (normal or hard) as its argument. It invokes the method ```startGameLoop(mode)``` that creates new arrows (with different speeds depending on the game mode) using the ```Arrow``` class, updates and draws them until time runs out and the game ends. Other methods check for arrow collision on hit area, check if the player hits the correct keys at the right time, gives or reduces points or updates the player score and finally passes the score value to game over screen. 

### 4. arrow.js
Holds the class ```Arrow``` with properties such as arrow type, speed, position, image and ones that tell if the arrow is aligned with its hitbox or if the player already hit it. The methods update the arrow position, draw, check for box collision or check if the arrow is still on screen.

## States and State Transitions

- SplashScreen
   - Display splash screen
   - Start game when start button is clicked

- GameScreen
   - game runs while timer has not run out
   - when timer = 0, go to game over screen

- Gameover 
   - display player points
   - display high scores (BACKLOG)
   - if restart button is pressed, go to game screen
   - if 'back to main' button is presssed, go to splash screen


## Links
<!-- 
### Trello
[trello](https://trello.com/b/UGy7IOLt/m1-project-game#) -->

### Git

[Deployed version hosted by GitHub](https://fetaplop.github.io/m1-project-game/)

<!-- 
### Slides
URls for the project presentation [Google slides](https://docs.google.com/presentation/d/1fADS9TJ1p2xlASEBgkmZ8av84xYwjbxrhJwSp7mYoDE/edit?usp=sharing) -->

