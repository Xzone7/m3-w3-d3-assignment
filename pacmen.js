const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

const functionSetRandomPid = number => Math.floor(Math.random() * number) + 1;

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(700);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  const randomPid = functionSetRandomPid(4);
  newimg.src = `./images/PacMan${randomPid}.png`;
  newimg.width = 100;

  // TODO: set position here
  if (randomPid === 3 || randomPid === 4) {
    velocity = {
      x: -velocity.x,
      y: -velocity.y
    }
  }
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    randomPid
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
}

function start() {
  setInterval(update, 20);
}

const getItemSize = item => ({
  width: Number.parseInt(window.getComputedStyle(item.newimg).width),
  height: Number.parseInt(window.getComputedStyle(item.newimg).height)
});

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  const rightBoundCollisionX = window.innerWidth - getItemSize(item).width;
  const bottomBoundCollisionY = window.innerHeight - getItemSize(item).height;

  const itemClientX = item.position.x;
  const itemClientY = item.position.y;

  // set x coord collision 
  if (itemClientX >= rightBoundCollisionX || itemClientX <= 0) {
    item.velocity.x = -item.velocity.x;
    switch(item.randomPid) {
      case 1:
        item.newimg.src = "./images/PacMan4.png";
        item.randomPid = 4;
        break;
      case 2: 
        item.newimg.src = "./images/PacMan3.png";
        item.randomPid = 3;
        break;
      case 3: 
        item.newimg.src = "./images/PacMan2.png";
        item.randomPid = 2;
        break;
      case 4: 
        item.newimg.src = "./images/PacMan1.png";
        item.randomPid = 1;
        break;
    }
  }

  // set y collision
  if (itemClientY >= bottomBoundCollisionY || itemClientY <= 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
