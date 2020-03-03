# team46
Our project is an online platform for players to play the game Sokoban in multi player mode, create and post their own Sokoban layouts, as well as purchase custom icons and badges using the tokens earned from solving the puzzles.

Below is the instruction on how to use the app in phase 1:
* Open the app you will see our login page
* You can go to the sign up page by clicking "sign up" in home page. The information to fill in in sign up page should be straightforward. After signing up you will be directed back to log in page after clicking sign up.
* Credentials:

  normal user: log in with username "user" and password "user"

  admin user: log in with username "admin" and password "admin"

* If you log yourself in as admin, you will be directed to the admin page
  
  You will see a list of users on the app, and you can search for a specific user by input the full username in the search bar(it is case sensitive for now) and click the search icon

  You will also see a list of products of the token shop, which will be shown later in the normal user mode

  The users each have tokens, and it is supposed to be able to purchase products in the token shops

  You can click "add token to all" to add one token for each user

  If you click "remove all", all users will be removed (please try it after you are done with the other features of the user list)

  If you click "add new product", a new product with a default name and price will be added to the list of products (at the bottom, so you might need to scroll down)

  For each user, you will see their user name, profile picture and number of tokens. There are also three actions you can take with each user:

    If you click the delete icon, the user will be removed

    If you click "change password", there will be a popup where you can fill in the new password

    If you click "change tokens", a popup will be shown for you to enter a new amount, the change will be reflected
    after you submit the new token amount.
  
  For each product in the product list: 

    You can toggle if it is in the token shop by clicking "make (un)available"

    You can also edit its name and price by clicking edit, after which a pop up will be shown for you to enter the new name and price
  
  You can click the exit icon at the top left corner of the page to go back to the log in page

* All other pages are for normal users and thus we will assume that you log yourself in as the normal user, and we will use the word "user" to refer to users without admin priviledge

* After logging in as an user, you will see the your profile page:
  First you will see your user name and profile picture in the profile

  Below are three buttons to jump to the main functionaities for each user, and the pages clicking them will show up later in this instruction

  Below the three buttons are three sections, which are collapsed by default:

    The account information contains personal information

    The game history contains the scores in your past games

    The games created part contains previews of games that you created and posted

  You can click the exit icon on top left corner to go back to log in page.

* You can start playing by clicking "go to lobby" from the user profile.

  In the lobby you will see a list of available game layouts that are created by you or other users

  You can search for games by typing in the search bar on top, right now you only filter for games by their name

  There are two ways to start playing:

    You can click the button create room under each layout, and you will enter a game room as a room owner

    You can also enter a four digit code and click "play" at the bottom of the page

  There is a button on top left to go back to user profile

* After getting into the game room:

  First on top you will see the room code that other people can use to enter this room

  Then you will see your user name

  You will see a list of users that is already in the room, for each user in the list:

    If it is you, you will see a button "quit" and clicking it will have you quit the game and redirect you back to lobby

    If it is another user, and if you are the room owner, you can kick the user out of the room by clicking "kick" under that user

  If you are the room owner, you will see a button "start" to start the entire game

* After the game starts, you will be directed to the actual game interface

  If you want to quit the game, just click "quit"

  Otherwise you can use "WASD" to move your player and try to move the boxes into green dots (the goals)
    (by the way, you need to click the game for the keys to work properly if you move your focus somewhere else, say the chatbox)

  You can input a message on top of the chatbox and send a message to other players (the send button is disabled if the message is empty)

  Right now the this page is only a single player game because multiplayer cannot be done without a server

  If you successfully solve a game, you will be redirected back to game lobby after 5 seconds (there will be a message for it)

* You can also create your own games, and you can get to that page by clicking "create games" from your user profile, and you will be redirected to the page of your created games

  You will see a list of game layouts you already created

  If you click delete, the layout will be removed

  If you click edit or if you click create game, you will be redirected to the game editting page

  There is an exit button on top left to go back to user profile

* Right now in the game editting page you will see a blank game, but in phase 2, we might also be loading a game you already created for you to edit
  The game is put in the grids

  Under the title "Game Edit", you will see a list of buttons for you to select what to add. For instance, if you select "wall" and click a cell in the grids, it will put wall in the cell. Meanwhile, if you select "delete", it will empty the cells that you create. Note that you can not put goals on walls but can put them on players and boxes.

  You can also adjust the board size using the slide bars

  There is a share icon by the title "Game Edit" and you will be able to post your game by clicking that button, and for now you will only be redirected to user profile page.

  You can give up by going clicking quit and go back to user profile page

* As an user you can go to token shop by clicking "token shop" in youur profile page

  There are three tabs of three different kinds of products that you will be able to purchase with your tokens
  
  You can go back to the user profile by clicking the exit button on top left of the page
