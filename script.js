(function () {
  let isPause = false;
  let animationId;
  const car = document.querySelector('.car');
  const trees = document.querySelectorAll('.tree');
  const button = document.querySelector('.button');
  const speed = 3;

  const tree1 = trees[0];

  animationId = requestAnimationFrame(startGame);
  const coordinateTree1 = getCoord(tree1);

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
    const newCoordY = coordinateTree1.y + speed;
    coordinateTree1.y = newCoordY;
    tree1.style.transform = `translate(${coordinateTree1.x}px,${newCoordY}px)`;
    console.log(coordinateTree1.x, coordinateTree1.y);
  }

  function startGame() {
    treesAnimation();

    animationId = requestAnimationFrame(startGame);
  }

  button.addEventListener('click', () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      button.children[0].style.display = 'none';
      button.children[1].style.display = 'block';
    } else {
      animationId = requestAnimationFrame(startGame);
      button.children[0].style.display = 'block';
      button.children[1].style.display = 'none';
    }
  });
})();
