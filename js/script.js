(function () {
  let isPause = false;
  let animationId;
  let score = 0;
  let speed = 3;
  const car = document.querySelector('.car');
  const button = document.querySelector('.button');
  const coin = document.querySelector('.coin');
  const arrow = document.querySelector('.arrow');
  const danger = document.querySelector('.danger');
  const gameScore = document.querySelector('.game-score');
  const finishGameWindow = document.querySelector('.finish-game');
  const restartButton = document.querySelector('.finish-game__button');

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
  animationId = requestAnimationFrame(startGame);

  //car logic
  document.addEventListener('keydown', (event) => {
    if (isPause) {
      return;
    }
    const code = event.code;
    if (code === 'ArrowUp' && carInfo.move.top === null) {
      if (carInfo.move.bottom) {
        return;
      }
      carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
    } else if (code === 'ArrowDown' && carInfo.move.bottom === null) {
      if (carInfo.move.top) {
        return;
      }
      carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo));
    } else if (code === 'ArrowLeft' && carInfo.move.left === null) {
      if (carInfo.move.right) {
        return;
      }
      carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
    } else if (code === 'ArrowRight' && carInfo.move.right === null) {
      if (carInfo.move.left) {
        return;
      }
      carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
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

  function startGame() {
    elementAnimation(danger, dangerInfo, 300, speed);
    if (dangerInfo.visible && hasCollision(carInfo, dangerInfo)) {
      return finishGames();
    }
    treesAnimation(speed);
    elementAnimation(coin, coinInfo, 250, speed);
    if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
      score++;
      gameScore.textContent = score;
      coin.style.display = 'none';
      coinInfo.visible = false;
      if (score % 2 === 0) {
        speed += 2;
      }
    }
    elementAnimation(arrow, arrowInfo, 400, speed);
    if (arrowInfo.visible && hasCollision(carInfo, arrowInfo)) {
      arrow.style.display = 'none';
      arrowInfo.visible = false;
      danger.style.opacity = '0.2';
      dangerInfo.visible = false;
      arrowInfo.ignoreAppearance = true;
      dangerInfo.ignoreAppearance = true;
      speed += 10;
      setTimeout(() => {
        speed -= 10;
        danger.style.opacity = 1;
        setTimeout(() => {
          dangerInfo.visible = true;
          arrowInfo.ignoreAppearance = false;
          dangerInfo.ignoreAppearance = false;
        }, 500);
      }, 1000);
    }
    animationId = requestAnimationFrame(startGame);
  }

  function cancelAnimation() {
    cancelAnimationFrame(animationId);
    cancelAnimationFrame(carInfo.move.top);
    cancelAnimationFrame(carInfo.move.bottom);
    cancelAnimationFrame(carInfo.move.left);
    cancelAnimationFrame(carInfo.move.right);
  }
  function finishGames() {
    cancelAnimation();
    finishGameWindow.style.display = 'flex';
    const finishScore = document.querySelector('.finish-text-score');
    finishScore.innerHTML = score;
    button.style.display = 'none';
    gameScore.style.display = 'none';
  }
  button.addEventListener('click', () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimation();
      button.children[0].style.display = 'none';
      button.children[1].style.display = 'block';
    } else {
      animationId = requestAnimationFrame(startGame);
      button.children[0].style.display = 'block';
      button.children[1].style.display = 'none';
    }
  });
  restartButton.addEventListener('click', () => {
    window.location.reload();
  });
})();
