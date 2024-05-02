(function () {
  let isPause = false;
  let animationId;
  const car = document.querySelector('.car');
  const trees = document.querySelectorAll('.tree');
  const button = document.querySelector('.button');
  const road = document.querySelector('.road');
  const roadHeight = road.clientHeight;
  const roadWidthHalf = road.clientWidth / 2;
  const carHeight = car.clientHeight;
  const carWidth = car.clientWidth;
  const carWidhtHalf = carWidth / 2;
  const speed = 3;
  const treesCoordinate = [];
  animationId = requestAnimationFrame(startGame);

  //car logic
  const carCoordinate = getCoord(car);
  const carInfoMove = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };
  document.addEventListener('keydown', (event) => {
    if (isPause) {
      return;
    }
    const code = event.code;
    if (code === 'ArrowUp' && carInfoMove.top === null) {
      if (carInfoMove.bottom) {
        return;
      }
      carInfoMove.top = requestAnimationFrame(carMoveToTop);
    } else if (code === 'ArrowDown' && carInfoMove.bottom === null) {
      if (carInfoMove.top) {
        return;
      }
      carInfoMove.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (code === 'ArrowLeft' && carInfoMove.left === null) {
      if (carInfoMove.right) {
        return;
      }
      carInfoMove.left = requestAnimationFrame(carMoveToLeft);
    } else if (code === 'ArrowRight' && carInfoMove.right === null) {
      if (carInfoMove.left) {
        return;
      }
      carInfoMove.right = requestAnimationFrame(carMoveToRight);
    }
  });
  document.addEventListener('keyup', (event) => {
    const code = event.code;
    if (code === 'ArrowUp') {
      cancelAnimationFrame(carInfoMove.top);
      carInfoMove.top = null;
    } else if (code === 'ArrowDown') {
      cancelAnimationFrame(carInfoMove.bottom);
      carInfoMove.bottom = null;
    } else if (code === 'ArrowLeft') {
      cancelAnimationFrame(carInfoMove.left);
      carInfoMove.left = null;
    } else if (code === 'ArrowRight') {
      cancelAnimationFrame(carInfoMove.right);
      carInfoMove.right = null;
    }
  });

  function carMoveToTop() {
    const coordY = carCoordinate.y;
    const newCoordY = coordY - 3;
    if (newCoordY < 0) {
      return;
    }
    carCoordinate.y = newCoordY;
    car.style.transform = `translate(${carCoordinate.x}px,${newCoordY}px)`;
    carInfoMove.top = requestAnimationFrame(carMoveToTop);
  }
  function carMoveToBottom() {
    const coordY = carCoordinate.y;
    const newCoordY = coordY + 3;
    if (newCoordY + carHeight > roadHeight) {
      return;
    }
    carCoordinate.y = newCoordY;
    car.style.transform = `translate(${carCoordinate.x}px,${newCoordY}px)`;
    carInfoMove.bottom = requestAnimationFrame(carMoveToBottom);
  }
  function carMoveToLeft() {
    const coordX = carCoordinate.x;
    const newCoordX = coordX - 3;
    if (newCoordX < -roadWidthHalf + carWidhtHalf) {
      return;
    }
    carCoordinate.x = newCoordX;
    car.style.transform = `translate(${newCoordX}px,${carCoordinate.y}px)`;
    carInfoMove.left = requestAnimationFrame(carMoveToLeft);
  }
  function carMoveToRight() {
    const coordX = carCoordinate.x;
    const newCoordX = coordX + 3;
    if (newCoordX > roadWidthHalf - carWidhtHalf) {
      return;
    }
    carCoordinate.x = newCoordX;
    car.style.transform = `translate(${newCoordX}px,${carCoordinate.y}px)`;
    carInfoMove.right = requestAnimationFrame(carMoveToRight);
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

    animationId = requestAnimationFrame(startGame);
  }

  button.addEventListener('click', () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(carInfoMove.top);
      cancelAnimationFrame(carInfoMove.bottom);
      cancelAnimationFrame(carInfoMove.left);
      cancelAnimationFrame(carInfoMove.right);
      button.children[0].style.display = 'none';
      button.children[1].style.display = 'block';
    } else {
      animationId = requestAnimationFrame(startGame);
      button.children[0].style.display = 'block';
      button.children[1].style.display = 'none';
    }
  });
})();
