(function () {
  let isPause = false;
  let animationId;
  let score = 0;
  let speed = 3;
  const car = document.querySelector('.car');
  const trees = document.querySelectorAll('.tree');
  const button = document.querySelector('.button');
  const road = document.querySelector('.road');
  const coin = document.querySelector('.coin');
  const arrow = document.querySelector('.arrow');
  const danger = document.querySelector('.danger');
  const gameScore = document.querySelector('.game-score');

  const carInfo = {
    ...createElementInfo(car),
    move: {
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  };
  const coinInfo = createElementInfo(coin);
  const arrowInfo = createElementInfo(arrow);
  const dangerInfo = createElementInfo(danger);
  const roadHeight = road.clientHeight;
  const roadWidthHalf = road.clientWidth / 2;
  const treesCoordinate = [];
  animationId = requestAnimationFrame(startGame);
  function createElementInfo(el) {
    return {
      widthHalf: el.clientWidth / 2,
      height: el.clientHeight,
      coordinate: getCoord(el),
      visible: true,
    };
  }
  //car logic
  document.addEventListener('keydown', (event) => {
    // if (isPause) {
    //   return;
    // }
    const code = event.code;
    if (code === 'ArrowUp' && carInfo.move.top === null) {
      if (carInfo.move.bottom) {
        return;
      }
      carInfo.move.top = requestAnimationFrame(carMoveToTop);
    } else if (code === 'ArrowDown' && carInfo.move.bottom === null) {
      if (carInfo.move.top) {
        return;
      }
      carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (code === 'ArrowLeft' && carInfo.move.left === null) {
      if (carInfo.move.right) {
        return;
      }
      carInfo.move.left = requestAnimationFrame(carMoveToLeft);
    } else if (code === 'ArrowRight' && carInfo.move.right === null) {
      if (carInfo.move.left) {
        return;
      }
      carInfo.move.right = requestAnimationFrame(carMoveToRight);
    }
  });
  document.addEventListener('keyup', (event) => {
    const code = event.code;
    if (code === 'ArrowUp') {
      cancelAnimationFrame(carInfo.move.top);
      carInfo.move.top = null;
    } else if (code === 'ArrowDown') {
      cancelAnimationFrame(carInfo.move.bottom);
      carInfo.move.bottom = null;
    } else if (code === 'ArrowLeft') {
      cancelAnimationFrame(carInfo.move.left);
      carInfo.move.left = null;
    } else if (code === 'ArrowRight') {
      cancelAnimationFrame(carInfo.move.right);
      carInfo.move.right = null;
    }
  });

  function carMoveToTop() {
    const coordY = carInfo.coordinate.y;
    const newCoordY = coordY - 3;
    if (newCoordY < 0) {
      return;
    }
    carInfo.coordinate.y = newCoordY;
    carMove(carInfo.coordinate.x, newCoordY);
    // car.style.transform = `translate(${carInfo.coordinate.x}px,${newCoordY}px)`;
    carInfo.move.top = requestAnimationFrame(carMoveToTop);
  }
  function carMoveToBottom() {
    const coordY = carInfo.coordinate.y;
    const newCoordY = coordY + 3;
    if (newCoordY + carInfo.height > roadHeight) {
      return;
    }
    carInfo.coordinate.y = newCoordY;
    carMove(carInfo.coordinate.x, newCoordY);
    // car.style.transform = `translate(${carInfo.coordinate.x}px,${newCoordY}px)`;
    carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
  }
  function carMoveToLeft() {
    const coordX = carInfo.coordinate.x;
    const newCoordX = coordX - 3;
    // if (newCoordX < -roadWidthHalf + carInfo.widhtHalf) {
    //   return;
    // }
    carInfo.coordinate.x = newCoordX;
    carMove(newCoordX, carInfo.coordinate.y);
    // car.style.transform = `translate(${newCoordX}px,${carInfo.coordinate.y}px)`;
    carInfo.move.left = requestAnimationFrame(carMoveToLeft);
  }
  function carMoveToRight() {
    const coordX = carInfo.coordinate.x;
    const newCoordX = coordX + 3;
    // if (newCoordX > roadWidthHalf - carInfo.widhtHalf) {
    //   return;
    // }
    carInfo.coordinate.x = newCoordX;
    carMove(newCoordX, carInfo.coordinate.y);
    // car.style.transform = `translate(${newCoordX}px,${carInfo.coordinate.y}px)`;
    carInfo.move.right = requestAnimationFrame(carMoveToRight);
  }
  function getCoord(element) {
    const matrix = window.getComputedStyle(element).transform;
    const arrayOfCoordinate = matrix.split(',');
    const y = arrayOfCoordinate[arrayOfCoordinate.length - 1];
    const x = arrayOfCoordinate[arrayOfCoordinate.length - 2];
    const coordY = parseFloat(y);
    const coordX = parseFloat(x);
    return { x: coordX, y: coordY };
  }
  function carMove(x, y) {
    car.style.transform = `translate(${x}px,${y}px)`;
  }
  function treesAnimation() {
    trees.forEach((el) => {
      const coordinate = getCoord(el);
      treesCoordinate.push(coordinate);
      let newCoordY = coordinate.y + speed;

      if (newCoordY > window.innerHeight) {
        newCoordY = -320;
      }
      coordinate.y = newCoordY;
      el.style.transform = `translate(${coordinate.x}px,${newCoordY}px)`;
    });
  }

  function startGame() {
    treesAnimation();
    elementAnimation(coin, coinInfo, 250);
    // elementAnimation(danger, dangerInfo.coordinaterdinate, dangerInfo.widthHalf, 300);
    // elementAnimation(arrow, arrowInfo.coordinate, arrowInfo.widthHalfhtHalf, 400);
    if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
      score++;
      gameScore.textContent = score;
      coin.style.display = 'none';
      coinInfo.visible = false;
      if (score % 2 === 0) {
        speed += 2;
      }
    }
    animationId = requestAnimationFrame(startGame);
  }
  function hasCollision(el1Info, el2Info) {
    // X is on center of the page that X calculate another way
    const carYTop = el1Info.coordinate.y;
    const carYBottom = el1Info.coordinate.y + el1Info.height;
    const carXLeft = el1Info.coordinate.x - el1Info.widthHalf;
    const carXRight = el1Info.coordinate.x + el1Info.widthHalf;

    const coinYTop = el2Info.coordinate.y;
    const coinYBottom = el2Info.coordinate.y + el2Info.height;
    const coinXLeft = el2Info.coordinate.x - el2Info.widthHalf;
    const coinXRight = el2Info.coordinate.x + el2Info.widthHalf;

    if (carYTop > coinYBottom || carYBottom < coinYTop) {
      return false;
    }
    if (carXLeft > coinXRight || carXRight < coinXLeft) {
      return false;
    }
    return true;
  }

  function elementAnimation(element, elementInfo, y) {
    let newCoordY = elementInfo.coordinate.y + speed;
    let newCoordX = elementInfo.coordinate.x;
    if (newCoordY > window.innerHeight) {
      newCoordY = -y;
      let direction = parseInt(Math.random() * 2);
      let randomX = parseInt(Math.random() * (roadWidthHalf + 1 - elementInfo.widthHalf));
      newCoordX = direction === 0 ? -randomX : randomX;
      elementInfo.visible = true;
      element.style.display = 'initial';
    }
    elementInfo.coordinate.x = newCoordX;
    elementInfo.coordinate.y = newCoordY;
    element.style.transform = `translate(${newCoordX}px,${newCoordY}px)`;
  }

  button.addEventListener('click', () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(carInfo.move.top);
      cancelAnimationFrame(carInfo.move.bottom);
      cancelAnimationFrame(carInfo.move.left);
      cancelAnimationFrame(carInfo.move.right);
      button.children[0].style.display = 'none';
      button.children[1].style.display = 'block';
    } else {
      animationId = requestAnimationFrame(startGame);
      button.children[0].style.display = 'block';
      button.children[1].style.display = 'none';
    }
  });
})();
