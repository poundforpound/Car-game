(function () {
  let isPause = false;
  let animationId;
  const car = document.querySelector('.car');
  const trees = document.querySelectorAll('.tree');
  const button = document.querySelector('.button');
  const speed = 3;

  const tree1 = trees[0];

  animationId = requestAnimationFrame(startGame);

  function getCoordY(element) {
    const matrix = window.getComputedStyle(element).transform;
    const arrayOfCoordinate = matrix.split(',');
    const lastElement = arrayOfCoordinate[arrayOfCoordinate.length - 1];
    const coordY = parseFloat(lastElement);
    return coordY;
  }

  function treesAnimation() {
    const newCoordY = getCoordY(tree1) + speed;
    tree1.style.transform = `translateY(${newCoordY}px)`;
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
