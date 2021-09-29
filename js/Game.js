class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    animal1 = createSprite(width / 2 - 50, height - 100);
    animal1.addImage("animal1", animal1_img);
    animal1.scale = 0.07;

    animal2 = createSprite(width / 2 + 100, height - 100);
    animal2.addImage("animal2", animal2_img);
    animal2.scale = 0.07;
    animals = [animal1,animal2];
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        animals[index].position.x = x;
        animals[index].position.y = y;

        //add 1 to the index for every loop
        index = index + 1;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
        }
      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
}

